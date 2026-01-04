import { HTMLAttributes } from 'react'
import { getNumberSuffix } from '../../../utils/utils'
import styles from './ScorecardList.module.scss'

export type ScorecardListItem = { nickname: string; points: number }

interface Props extends HTMLAttributes<HTMLUListElement> {
  players: ScorecardListItem[]
}

export default function ScorecardList({ players = [], ...rest }: Props) {
  return (
    <ul className={styles.ul} {...rest}>
      {players
        .toSorted((a, b) => b.points - a.points)
        .map((player, idx) => (
          <li className={`${styles.li} ${styles.liAnimation}`} key={idx}>
            <span className={styles.place}>
              {idx + 1 + getNumberSuffix(idx + 1)}
            </span>
            <span className={styles.nickname}>{player.nickname}</span>
            <span className={styles.pointDiff}>{`+${player.points}`}</span>
          </li>
        ))}
    </ul>
  )
}
