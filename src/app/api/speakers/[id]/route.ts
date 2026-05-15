import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const speaker = await prisma.speaker.findUnique({
      where: { id: params.id },
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
    })
    if (!speaker) return sendError('Chef introuvable', 404)
    return sendSuccess(speaker)
  } catch {
    return sendError('Erreur serveur')
  }
}
