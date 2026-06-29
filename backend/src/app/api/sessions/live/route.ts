import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'


export async function GET() {
  try {
    const sessions = await prisma.session.findMany({
      include: {
        room: true,
        speakers: {
          include: {
            speaker: true,
          },
        },
        event: true,
      },
    })

    const liveSessions = sessions.filter((session) =>
      isLive(session.startTime, session.endTime)
    )

    return sendSuccess(liveSessions)
  } catch (error) {
    console.error('Error fetching live sessions:', error)
    return sendError('Failed to fetch live sessions', 500)
  }
}