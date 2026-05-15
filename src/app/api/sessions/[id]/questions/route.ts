import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'

// GET /api/sessions/:id/questions
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await prisma.session.findUnique({ where: { id: params.id } })
    if (!session) return sendError('Session introuvable', 404)

    const questions = await prisma.question.findMany({
      where: { sessionId: params.id },
      orderBy: { upvotes: 'desc' },
    })
    return sendSuccess(questions)
  } catch {
    return sendError('Erreur serveur')
  }
}

// POST /api/sessions/:id/questions
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json().catch(() => ({}))
    const { content, authorName } = body as { content?: string; authorName?: string }

    if (!content || content.trim() === '') {
      return sendError('Le contenu de la question est requis', 400)
    }

    const session = await prisma.session.findUnique({ where: { id: params.id } })
    if (!session) return sendError('Session introuvable', 404)

    if (!isLive(session.startTime, session.endTime)) {
      return sendError('Les questions ne sont acceptées que pendant la session live', 403)
    }

    const question = await prisma.question.create({
      data: {
        content:    content.trim(),
        authorName: authorName?.trim() || null,
        sessionId:  params.id,
      },
    })
    return sendSuccess(question, 201)
  } catch {
    return sendError('Erreur serveur')
  }
}
