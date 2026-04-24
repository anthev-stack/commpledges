import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { emailService } from "@/lib/email"

export async function POST() {
  try {
    // Get all active pledges that need payment reminders
    const pledgesNeedingReminders = await prisma.pledge.findMany({
      where: {
        status: 'ACTIVE',
        // Add logic to determine which pledges need reminders
        // For example, pledges that are due soon or overdue
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        server: {
          select: {
            name: true,
          },
        },
      },
    })

    let remindersSent = 0

    for (const pledge of pledgesNeedingReminders) {
      if (pledge.user?.email) {
        try {
          // Calculate due date (this would depend on your payment cycle logic)
          const dueDate = new Date()
          dueDate.setDate(dueDate.getDate() + 7) // Example: 7 days from now

          await emailService.sendPaymentReminder(
            pledge.user.email,
            pledge.user.name || 'User',
            `$${pledge.amount.toFixed(2)}`,
            dueDate.toLocaleDateString()
          )

          remindersSent++
        } catch (error) {
          console.error(`Failed to send payment reminder for pledge ${pledge.id}:`, error)
        }
      }
    }

    return NextResponse.json({
      success: true,
      remindersSent,
      totalPledges: pledgesNeedingReminders.length,
    })
  } catch (error) {
    console.error("Payment reminders cron error:", error)
    return NextResponse.json(
      { error: "Failed to send payment reminders" },
      { status: 500 }
    )
  }
}


