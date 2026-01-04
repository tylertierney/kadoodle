import { CSSProperties, PropsWithChildren } from 'react'
import styles from './Paper.module.scss'

type Props = PropsWithChildren<{
  style?: CSSProperties
  className?: string
}>

export default function Paper({ children, style, className = '' }: Props) {
  return (
    <div className={`${styles.paper} ${className}`} style={style}>
      {children}
    </div>
  )
}
