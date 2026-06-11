import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const speaker = await prisma.speaker.findUnique({
      where: { id: params.id },
      include: {
        sessions: {
          include: {
            session: {
              include: {
                room: true,
                event: true,
              },
            },
          },
        },
      },
    })

    if (!speaker) {
      return sendError('Speaker not found', 404)
    }

    const sessionsWithLive = speaker.sessions.map((item) => ({
      ...item.session,
      isLive: isLive(item.session.startTime, item.session.endTime),
    }))

    return sendSuccess({
      ...speaker,
      sessions: sessionsWithLive,
    })
  } catch (error) {
    console.error('Error fetching speaker:', error)
    return sendError('Failed to fetch speaker', 500)
  }
}