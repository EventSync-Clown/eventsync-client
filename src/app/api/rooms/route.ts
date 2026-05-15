import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        sessions: {
          include: {
            speakers: { include: { speaker: true } },
            event: true,
          },
          orderBy: { startTime: 'asc' },
        },
      },
    })
    return sendSuccess(rooms)
  } catch {
    return sendError('Erreur serveur')
  }
}
