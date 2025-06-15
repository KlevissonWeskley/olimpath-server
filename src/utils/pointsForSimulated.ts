export function pointsForSimulated(correctCount: number, total: number) {
  const percent = correctCount / total

  if (percent === 1) return 100
  if (percent >= 0.8) return 80
  if (percent >= 0.6) return 60
  if (percent >= 0.4) return 40
  if (percent >= 0.2) return 20
  return 10
}