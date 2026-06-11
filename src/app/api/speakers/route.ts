import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'


export async function GET() {
  try {
    const speakers = await prisma.speaker.findMany({
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
      orderBy: {
        name: 'asc',
      },
    })

    return sendSuccess(speakers)
  } catch (error) {
    console.error('Error fetching speakers:', error)
    return sendError('Failed to fetch speakers', 500)
  }
}