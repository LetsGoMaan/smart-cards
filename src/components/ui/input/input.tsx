import { ChangeEvent, useState } from 'react'

import eyeIcon from './../../../assets/eye.svg'
import searchIcon from './../../../assets/search.svg'
import xMarkIcon from './../../../assets/xMark.svg'
import s from './input.module.scss'

export type InputProps = {
  className?: string
  errorMessage?: string
  inputIcon?: string
  type: 'text' | 'password' | 'search'
  disabled?: boolean
}

export const Input = (props: InputProps) => {
  const { className = s.default, errorMessage, type = 'text', disabled } = props
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
      <div className={s.inputWrapper}>
        {type === 'search' ? (
          <img src={searchIcon} className={s.searchIcon} alt={'searchIcon'} />
        ) : null}
        <button className={s.inputIcon} onClick={cleanTextHandler}>
          {inputIcon && <img src={inputIcon} alt={'InputIcon'} />}
        </button>
        <input
          value={text}
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
