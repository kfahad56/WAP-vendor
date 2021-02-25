export const getDate = (d: Date): string => {
  return d.toISOString().replace('T', ' ').replace('Z', '')
}

export const toDate = (d: string): Date => {
  return new Date(d)
}