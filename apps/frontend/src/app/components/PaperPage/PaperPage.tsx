import { CSSProperties, PropsWithChildren } from 'react'
import Paper from '../Paper/Paper'

interface Props {
  style?: CSSProperties
}

export default function PaperPage({
  style,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Paper
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem 2rem',
        minHeight: 'calc(100vh - var(--navbar-height))',
        minWidth: 'min(70vw, 700px)',
        alignSelf: 'center',
        ...style,
      }}>
      {children}
    </Paper>
  )
}
