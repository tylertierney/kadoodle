import KadoodleKSVG from '../KadoodleKSVG/KadoodleKSVG'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <KadoodleKSVG style={{ height: '100px', opacity: 0.5 }} />
      <span
        style={{
          color: 'white',
          fontSize: '1.35rem',
          opacity: 0.5,
        }}>
        made by&nbsp;
        <a
          href="https://tylertierney.com"
          target="_blank"
          rel="noreferrer"
          style={{
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer',
            borderBottom: '1px solid white',
          }}>
          Tyler Tierney
        </a>
      </span>
    </div>
  )
}
