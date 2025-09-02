import { CSSProperties, PropsWithChildren } from 'react'
import styles from './Paper.module.scss'

type Props = PropsWithChildren<{
  style?: CSSProperties
}>

export default function Paper({ children, style }: Props) {
  return (
    <div className={styles.paper} style={style}>
      {children}
    </div>
  )
}
