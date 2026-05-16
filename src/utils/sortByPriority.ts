export const sortByPriority = <T>(a: T, b: T, priority: T[]) => {
  const ai = priority.indexOf(a)
  const bi = priority.indexOf(b)

  if (ai === -1 && bi === -1) return 0
  if (ai === -1) return 1
  if (bi === -1) return -1

  return ai - bi
}
