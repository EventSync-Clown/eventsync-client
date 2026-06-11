import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
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

    return sendSuccess(rooms)
  } catch (error) {
    console.error('Error fetching rooms:', error)
    return sendError('Failed to fetch rooms', 500)
  }
}