import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function GET() {
  try {
    const speakers = await prisma.speaker.findMany({
      include: {
        sessions: {
          include: {
            session: {
              include: { room: true, event: true },
            },
          },
          orderBy: { session: { startTime: 'asc' } },
        },
      },
      orderBy: { name: 'asc' },
    })
    return sendSuccess(speakers)
  } catch {
    return sendError('Erreur serveur')
  }
}
