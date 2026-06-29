import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        sessions: {
          include: {
            room: true,
            speakers: {
              include: {
                speaker: true,
              },
            },
            questions: true,
          },
          orderBy: {
            startTime: 'asc',
          },
        },
      },
    })

    if (!event) {
      return sendError('Event not found', 404)
    }

    // Add isLive flag to each session
    const sessionsWithLive = event.sessions.map((session) => ({
      ...session,
      isLive: isLive(session.startTime, session.endTime),
    }))

    return sendSuccess({ ...event, sessions: sessionsWithLive })
  } catch (error) {
    console.error('Error fetching event:', error)
    return sendError('Failed to fetch event', 500)
  }
}