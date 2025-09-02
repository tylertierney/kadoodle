import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/app'
import GameProvider from './app/context/GameContext'
import PeerProvider from './app/context/PeerContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
    <BrowserRouter>
      <GameProvider>
        <PeerProvider>
          <App />
        </PeerProvider>
      </GameProvider>
    </BrowserRouter>
  </StrictMode>,
)
