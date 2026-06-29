export interface Event {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  location: string
  sessions?: Session[]
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  id: string
  title: string
  description: string
  startTime: Date
  endTime: Date
  capacity: number | null
  isLive?: boolean
  eventId: string
  roomId: string
  room?: Room
  speakers?: SpeakerOnSession[]
  questions?: Question[]
  createdAt: Date
  updatedAt: Date
}

export interface Room {
  id: string
  name: string
  sessions?: Session[]
  createdAt: Date
}

export interface Speaker {
  id: string
  name: string
  photoUrl: string | null
  bio: string | null
  externalUrl: string | null
  sessions?: SpeakerOnSession[]
  createdAt: Date
  updatedAt: Date
}

export interface SpeakerOnSession {
  speakerId: string
  sessionId: string
  speaker: Speaker
  session: Session
}

export interface Question {
  id: string
  content: string
  authorName: string | null
  upvotes: number
  sessionId: string
  session?: Session
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data: T
  error?: string
}