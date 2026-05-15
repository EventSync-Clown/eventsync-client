export function isLive(startTime: Date, endTime: Date): boolean {
  const now = new Date()
  return now >= startTime && now <= endTime
}
