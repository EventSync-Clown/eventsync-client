import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await prisma.session.findUnique({
      where: { id: params.id },
      include: {
        room: true,
        event: true,
        speakers: {
          include: {
            speaker: true,
          },
        },
        questions: {
          orderBy: {
            upvotes: 'desc',
          },
        },
      },
    })

    if (!session) {
      return sendError('Session not found', 404)
    }

    const sessionWithLive = {
      ...session,
      isLive: isLive(session.startTime, session.endTime),
    }

    return sendSuccess(sessionWithLive)
  } catch (error) {
    console.error('Error fetching session:', error)
    return sendError('Failed to fetch session', 500)
  }
}