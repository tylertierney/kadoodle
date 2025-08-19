import io from 'socket.io-client'
const endpoint = import.meta.env.VITE_API_HOST

const ENDPOINT = endpoint || 'https://kadoodle-backend.onrender.com'

console.log(ENDPOINT)

const socket = io(ENDPOINT, {
  path: '/api',
})

export default socket
