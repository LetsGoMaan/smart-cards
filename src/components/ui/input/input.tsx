import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import eyeIcon from './../../../assets/eye.svg'
import searchIcon from './../../../assets/search.svg'
import xMarkIcon from './../../../assets/xMark.svg'
import s from './input.module.scss'

import { Typography } from '@/components/ui'

export type InputProps = {
  label?: string
  placeholder?: string
  className?: string
  errorMessage?: string
  inputIcon?: string
  type: 'text' | 'password' | 'search'
  disabled?: boolean
  value?: string
  onChangeValue?: (value: string) => void
  onEnter?: () => void
  onClearClick?: () => void
} & ComponentPropsWithoutRef<'input'>

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className = s.default,
    label,
    placeholder,
    errorMessage,
    type = 'text',
    disabled,
    value,
    onEnter,
    onChangeValue,
    onClearClick,
    ...restProps
  }) => {
    const isError = errorMessage ? s.error : ''
    const [isXmark, setIsXmark] = useState(false)
    const [text, setText] = useState('')
    // eslint-disable-next-line no-nested-ternary
    const inputIcon = type === 'password' ? eyeIcon : type === 'search' && isXmark ? xMarkIcon : ''
    const xMarkAppearance = (e: ChangeEvent<HTMLInputElement>) => {
      if (type === 'search') {
        setIsXmark(true)
      }
      setText(e.currentTarget.value)
    }

    const cleanTextHandler = () => {
      setIsXmark(false)
      setText('')
    }

    return (
      <>
        <Typography className={s.label} variant={'body2'} as={'label'}>
          {label}
        </Typography>
        <div className={s.inputWrapper}>
          {type === 'search' ? (
            <img src={searchIcon} className={s.searchIcon} alt={'searchIcon'} />
          ) : null}
          <button className={s.inputIcon} onClick={cleanTextHandler}>
            {inputIcon && <img src={inputIcon} alt={'InputIcon'} />}
          </button>
          <input
            //value={text}
            value={value}
            placeholder={placeholder}
            onChange={xMarkAppearance}
            disabled={disabled}
            className={`${isError ? isError : className}`}
            type={type}
          />
          {errorMessage ? <div className={s.errorMessage}>Error!</div> : null}
        </div>
      </>
    )
  }
)
