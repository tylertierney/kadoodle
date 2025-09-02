import { Player } from '@kadoodle/models'
import styles from './Sidebar.module.scss'

interface Props {
  players: Player[]
}

export default function Sidebar({ players }: Props) {
  return <div className={styles.container}></div>
}
