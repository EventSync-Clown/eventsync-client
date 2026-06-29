export function isLive(startTime: Date, endTime: Date): boolean {
  const now = new Date()
  return now >= new Date(startTime) && now <= new Date(endTime)
}