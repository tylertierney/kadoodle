import styles from './Timer.module.scss'

interface Props {
  time: number
}

export default function Timer({ time }: Props) {
  return <div className={styles.timer}>{time}</div>
}
