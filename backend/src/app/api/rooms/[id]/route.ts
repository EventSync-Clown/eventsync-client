import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const room = await prisma.room.findUnique({
      where: { id: params.id },
      include: {
        sessions: {
          include: {
            event: true,
            speakers: {
              include: {
                speaker: true,
              },
            },
          },
          orderBy: {
            startTime: 'asc',
          },
        },
      },
    })

    if (!room) {
      return sendError('Room not found', 404)
    }

    const sessionsWithLive = room.sessions.map((session) => ({
      ...session,
      isLive: isLive(session.startTime, session.endTime),
    }))

    return sendSuccess({
      ...room,
      sessions: sessionsWithLive,
    })
  } catch (error) {
    console.error('Error fetching room:', error)
    return sendError('Failed to fetch room', 500)
  }
}