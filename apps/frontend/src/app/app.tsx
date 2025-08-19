// import styles from './app.module.scss';
import { Link, Route, Routes } from 'react-router-dom'
import socket from './socket'

export function App() {
  socket.on('idk', () => console.log('hi'))

  // const

  return (
    <>
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
      <button onClick={() => socket.emit('clicked', 'some message here')}>
        test
      </button>
    </>
  )
}

export default App
