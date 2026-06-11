import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function GET(request: NextRequest) {
  try {
    const events = await prisma.event.findMany({
      include: {
        sessions: {
          include: {
            room: true,
            speakers: {
              include: {
                speaker: true,
              },
            },
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    })

    return sendSuccess(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return sendError('Failed to fetch events', 500)
  }
}