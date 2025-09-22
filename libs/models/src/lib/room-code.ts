export const generateRoomCode = (): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array(4)
    .fill(null)
    .map(() => alphabet[~~(Math.random() * alphabet.length)])
    .join('')
}
