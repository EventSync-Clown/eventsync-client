import { NextResponse } from 'next/server'

export function sendSuccess(data: any, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function sendError(error: string, status: number = 500) {
  return NextResponse.json({ success: false, error }, { status })
}