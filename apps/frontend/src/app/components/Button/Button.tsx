import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import styles from './Button.module.scss'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'gradient'
  | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
  rounded?: boolean
  size?: ButtonSize
  rightIcon?: ReactNode
  leftIcon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  showDisabled?: boolean
}

type Props = PropsWithChildren<ButtonProps>

export default function Button({
  variant = 'primary',
  isLoading = false,
  rounded = false,
  size = 'md',
  children,
  rightIcon,
  leftIcon,
  onClick,
  disabled = false,
  showDisabled = false,
  className = '',
  ...rest
}: Props): ReactNode {
  return (
    <button
      data-testid="button"
      className={`
        ${styles.button} 
        ${styles[variant]} 
        ${rounded ? styles.rounded : ''} 
        ${styles[size]}
        ${isLoading ? styles.loading : ''}
        ${disabled || showDisabled ? styles.disabled : ''}
        ${className}
      `}
      disabled={disabled}
      onClick={isLoading ? undefined : onClick}
      {...rest}>
      <span
        className={styles.buttonContent}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {leftIcon ? (
          <span className={`${styles.icon} ${styles.left}`}>{leftIcon}</span>
        ) : (
          ''
        )}
        {children}
        {rightIcon ? (
          <span className={`${styles.icon} ${styles.right}`}>{rightIcon}</span>
        ) : (
          ''
        )}
      </span>
      {isLoading ? <BiLoaderAlt className={`spin ${styles.loader}`} /> : ''}
    </button>
  )
}
