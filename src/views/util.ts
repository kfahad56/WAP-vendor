export const formatDate = (date: Date) => {
  return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
}

export const getDate = (d: Date): string => {
  return d.toISOString().replace('T', ' ').replace('Z', '')
}