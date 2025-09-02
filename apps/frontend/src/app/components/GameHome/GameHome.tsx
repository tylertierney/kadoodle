import { PropsWithChildren } from 'react'
import Paper from '../Paper/Paper'
import styles from './GameHome.module.scss'

export default function GameHome({ children }: PropsWithChildren) {
  return (
    <div className={styles.container}>
      <Paper></Paper>
    </div>
  )
}
