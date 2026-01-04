import { PropsWithChildren, ReactNode } from 'react'
import styles from './Tabs.module.scss'

export interface Tab {
  label: ReactNode
  content: ReactNode
}

interface Props {
  tabs: Tab[]
  active: number
  onTabChange: (idx: number) => void
}

export default function Tabs({
  tabs,
  active = 0,
  onTabChange,
}: PropsWithChildren<Props>) {
  const content = tabs[active].content

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map(({ label }, i) => (
          <button
            key={i}
            className={`
            ${styles.tab}
            ${active === i ? styles.active : ''}
          `}
            onClick={() => onTabChange(i)}>
            {label}
          </button>
        ))}
      </div>
      {content}
    </div>
  )
}
