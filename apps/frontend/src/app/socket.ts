import { ClientToServerEvents, ServerToClientEvents } from '@kadoodle/models'
import io, { Socket } from 'socket.io-client'
const endpoint = import.meta.env.VITE_API_HOST

const ENDPOINT = endpoint || 'https://kadoodle-backend.onrender.com'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  ENDPOINT,
  {
    path: '/api',
  },
)

socket.on('connect_error', err => {
  console.log(err.message)
  socket.disconnect()
})

export default socket
