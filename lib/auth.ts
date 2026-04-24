import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  // Note: PrismaAdapter is commented out because it conflicts with CredentialsProvider
  // The adapter is only needed for OAuth providers when using database sessions
  // adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials")
            throw new Error("Invalid credentials")
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user) {
            console.log("User not found:", credentials.email)
            throw new Error("Invalid credentials")
          }

          if (!user.password) {
            console.log("User has no password (OAuth user):", credentials.email)
            throw new Error("Invalid credentials")
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isCorrectPassword) {
            console.log("Incorrect password for:", credentials.email)
            throw new Error("Invalid credentials")
          }

          console.log("Login successful for:", credentials.email)
          return {
            id: user.id,
            email: user.email!,
            name: user.name,
            image: user.image,
          }
        } catch (error) {
          console.error("Authorize error:", error)
          throw error
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // For OAuth providers (Discord), create or update the user in database
        if (account?.provider === 'discord' && user.email) {
          console.log("Discord OAuth sign in", { email: user.email })
          
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          })
          
          if (existingUser) {
            console.log("Existing Discord user found", { id: existingUser.id })
            // Update user info from Discord
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                name: user.name,
                image: user.image,
              },
            })
            // Set the user ID from database
            user.id = existingUser.id
          } else {
            console.log("Creating new Discord user")
            // Create new user
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
              },
            })
            user.id = newUser.id
            console.log("New Discord user created", { id: newUser.id })
          }
        }
        
        return true
      } catch (error) {
        console.error("Sign in callback error:", error)
        return true // Allow sign in even if database update fails
      }
    },
    async jwt({ token, user, account, trigger }) {
      try {
        console.log("JWT callback started", { hasUser: !!user, trigger, tokenId: token.id })
        
        if (user) {
          console.log("Processing new user login", { userId: user.id, email: user.email })
          token.id = user.id
          
          // Fetch user role from database
          console.log("Fetching user from database...")
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: { role: true, name: true, image: true }
          })
          
          console.log("Database user fetched", { found: !!dbUser, role: dbUser?.role })
          
          if (dbUser) {
            token.role = dbUser.role
            token.name = dbUser.name || user.name
            token.picture = dbUser.image || user.image
          } else {
            console.error("User not found in database after successful login!", { userId: user.id })
          }
        }
        
        // Handle session updates
        if (trigger === "update") {
          console.log("Handling session update", { tokenId: token.id })
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { role: true, name: true, image: true }
          })
          
          if (dbUser) {
            token.role = dbUser.role
            token.name = dbUser.name
            token.picture = dbUser.image
          }
        }
        
        console.log("JWT callback completed successfully")
        return token
      } catch (error) {
        console.error("JWT callback error:", error)
        console.error("Error details:", JSON.stringify(error, null, 2))
        return token
      }
    },
    async session({ session, token }) {
      try {
        if (session.user) {
          session.user.id = token.id as string
          session.user.role = token.role as any
          
          // Update name and image from token if available
          if (token.name) session.user.name = token.name as string
          if (token.picture) session.user.image = token.picture as string
        }
        return session
      } catch (error) {
        console.error("Session callback error:", error)
        return session
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

