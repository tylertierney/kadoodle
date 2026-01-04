import { CharacterObj } from '@kadoodle/models'
import styles from './Avatar.module.scss'

interface Props {
  characters: CharacterObj[]
  selectedCharacter: CharacterObj
  setSelectedCharacter: (character: CharacterObj) => void
}

export default function AvatarArray({
  characters = [],
  selectedCharacter,
  setSelectedCharacter,
}: Props) {
  return (
    <div className={styles.avatars}>
      {characters.map((ch, idx) => {
        return (
          <img
            onClick={() => setSelectedCharacter(ch)}
            key={idx}
            src={`/svg/${ch.name}.svg`}
            className={`
              ${styles.avatar}
              ${selectedCharacter === ch ? styles.selected : ''}
            `}
            alt="Avatar"
            style={{
              backgroundColor: ch.color,
            }}
          />
        )
      })}
    </div>
  )
}
