import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
const minecraftUtil = require("minecraft-server-util")
const GamedigLib = require("gamedig")
// Gamedig v5+ exports GameDig object with query method
const Gamedig = GamedigLib.GameDig || GamedigLib
const net = require("net")

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const server = await prisma.server.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        gameType: true,
        serverIp: true,
        serverPort: true,
      },
    })

    if (!server) {
      return NextResponse.json(
        { error: "Server not found" },
        { status: 404 }
      )
    }

    if (!server.serverIp) {
      return NextResponse.json({
        serverId: server.id,
        serverName: server.name,
        gameType: server.gameType,
        stats: {
          online: false,
          error: "Server address not configured",
        },
      })
    }

    // Parse IP and port
    // First check if serverPort is explicitly set in database
    let ip: string
    let port: number
    
    if (server.serverPort) {
      // Use serverPort field if available
      ip = server.serverIp.includes(":") ? server.serverIp.split(":")[0] : server.serverIp
      port = server.serverPort
    } else {
      // Fall back to parsing from serverIp
      const [ipPart, portStr] = server.serverIp.split(":")
      
      if (!portStr) {
        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: false,
            error: "Server port not configured",
          },
        })
      }
      
      ip = ipPart
      port = parseInt(portStr)
    }

    console.log(`Checking server stats for ${server.name} (${server.gameType}): ${ip}:${port}`)

    // Handle Minecraft servers
    if (server.gameType.toLowerCase().includes("minecraft")) {
      try {
        const response = await minecraftUtil.status(ip, port, {
          timeout: 5000,
          enableSRV: true,
        })

        // Update player count in database
        await prisma.server.update({
          where: { id },
          data: { playerCount: response.players.online },
        })

        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: true,
            players: {
              online: response.players.online,
              max: response.players.max,
            },
            version: response.version?.name || null,
            motd: response.motd?.clean || response.motd?.raw || null,
            serverType: "Minecraft",
          },
        })
      } catch (error: any) {
        console.error(`Minecraft query failed for ${ip}:${port}:`, error.message)
        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: false,
            error: "Server offline or unreachable",
          },
        })
      }
    }

    // Handle Counter-Strike games (CS2, CS:GO, CS:S, CS 1.6)
    if (server.gameType.toLowerCase().includes("counter-strike") || 
        server.gameType.toLowerCase().includes("cs2") ||
        server.gameType.toLowerCase().includes("cs:go") ||
        server.gameType.toLowerCase().includes("cs:s") ||
        server.gameType.toLowerCase().includes("cs 1.6")) {
      
      try {
        // CS2 uses the same query protocol as CS:GO (Source engine A2S protocol)
        let gameType = "csgo" // Default to csgo for CS2 (same protocol)
        if (server.gameType.toLowerCase().includes("cs:s")) {
          gameType = "css"
        } else if (server.gameType.toLowerCase().includes("cs 1.6")) {
          gameType = "cs16"
        }

        console.log(`Querying CS server: ${ip}:${port} with type: ${gameType}`)

        const state = await Gamedig.query({
          type: gameType,
          host: ip,
          port: port,
        })

        // Update player count in database
        await prisma.server.update({
          where: { id },
          data: { playerCount: state.players.length },
        })

        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: true,
            players: {
              online: state.players.length,
              max: state.maxplayers,
            },
            map: state.map || null,
            version: state.raw?.version || null,
            ping: state.ping || null,
            serverType: server.gameType,
          },
        })
      } catch (error: any) {
        console.error(`Counter-Strike query failed for ${ip}:${port}:`, error.message)
        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: false,
            error: "Server offline or unreachable",
          },
        })
      }
    }

    // Handle Team Fortress 2
    if (server.gameType.toLowerCase().includes("team fortress") || 
        server.gameType.toLowerCase().includes("tf2")) {
      
      try {
        const state = await Gamedig.query({
          type: "tf2",
          host: ip,
          port: port,
        })

        // Update player count in database
        await prisma.server.update({
          where: { id },
          data: { playerCount: state.players.length },
        })

        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: true,
            players: {
              online: state.players.length,
              max: state.maxplayers,
            },
            map: state.map || null,
            version: state.raw?.version || null,
            ping: state.ping || null,
            serverType: server.gameType,
          },
        })
      } catch (error: any) {
        console.error(`Team Fortress 2 query failed for ${ip}:${port}:`, error.message)
        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: false,
            error: "Server offline or unreachable",
          },
        })
      }
    }

    // For other games, do a simple TCP connection test
    try {
      const isOnline = await testTCPConnection(ip, port)
      
      if (isOnline) {
        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: true,
            serverType: server.gameType,
          },
        })
      } else {
        return NextResponse.json({
          serverId: server.id,
          serverName: server.name,
          gameType: server.gameType,
          stats: {
            online: false,
            error: "Server offline",
          },
        })
      }
    } catch (error) {
      return NextResponse.json({
        serverId: server.id,
        serverName: server.name,
        gameType: server.gameType,
        stats: {
          online: false,
          error: "Connection test failed",
        },
      })
    }
  } catch (error) {
    console.error("Server stats error:", error)
    return NextResponse.json(
      { error: "Failed to fetch server stats" },
      { status: 500 }
    )
  }
}

// Test TCP connection to a server
function testTCPConnection(host: string, port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket()
    
    socket.setTimeout(5000)
    
    socket.on("connect", () => {
      socket.destroy()
      resolve(true)
    })
    
    socket.on("timeout", () => {
      socket.destroy()
      resolve(false)
    })
    
    socket.on("error", () => {
      resolve(false)
    })
    
    socket.connect(port, host)
  })
}





