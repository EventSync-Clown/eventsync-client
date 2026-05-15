import { NextResponse } from 'next/server'

export function sendSuccess(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function sendError(message: string, status = 500) {
  return NextResponse.json({ success: false, error: message }, { status })
}
