export const generateRoomCode = (): string => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
  return Array(4)
    .fill(null)
    .map(() => alphabet[~~(Math.random() * alphabet.length)])
    .join('')
}
