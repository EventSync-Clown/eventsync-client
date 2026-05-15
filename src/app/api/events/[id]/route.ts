import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        sessions: {
          include: {
            room: true,
            speakers: { include: { speaker: true } },
            questions: { orderBy: { upvotes: 'desc' } },
          },
          orderBy: { startTime: 'asc' },
        },
      },
    })
    if (!event) return sendError('Événement introuvable', 404)
    return sendSuccess(event)
  } catch {
    return sendError('Erreur serveur')
  }
}
