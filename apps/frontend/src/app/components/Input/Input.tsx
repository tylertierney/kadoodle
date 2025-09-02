import { InputHTMLAttributes, RefObject } from 'react'
import styles from './Input.module.scss'

export type InputVariant = 'primary' | 'secondary'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  ref?: RefObject<HTMLInputElement | null>
  variant?: InputVariant
}

export default function Input({ variant = 'primary', ref, ...rest }: Props) {
  return (
    <input
      ref={ref}
      className={`
        ${styles.input}
        ${styles[variant]}
        `}
      {...rest}
    />
  )
}
