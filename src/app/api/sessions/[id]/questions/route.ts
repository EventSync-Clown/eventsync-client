import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendSuccess, sendError } from '@/lib/response'
import { isLive } from '@/lib/isLive'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const questions = await prisma.question.findMany({
      where: { sessionId: params.id },
      orderBy: {
        upvotes: 'desc',
      },
    })

    return sendSuccess(questions)
  } catch (error) {
    console.error('Error fetching questions:', error)
    return sendError('Failed to fetch questions', 500)
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await prisma.session.findUnique({
      where: { id: params.id },
    })

    if (!session) {
      return sendError('Session not found', 404)
    }

    if (!isLive(session.startTime, session.endTime)) {
      return sendError('Questions can only be posted during live sessions', 403)
    }

    const body = await request.json()
    const { content, authorName } = body

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return sendError('Question content is required', 400)
    }

    const question = await prisma.question.create({
      data: {
        content: content.trim(),
        authorName: authorName?.trim() || null,
        sessionId: params.id,
      },
    })

    return sendSuccess(question, 201)
  } catch (error) {
    console.error('Error creating question:', error)
    return sendError('Failed to create question', 500)
  }
}