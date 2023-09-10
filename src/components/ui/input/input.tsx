import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, KeyboardEvent, useState } from 'react'

import { EyeNoneIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import s from './input.module.scss'

import { eyeIcon, xMarkIcon } from '@/assets'
import { Typography } from '@/components/ui'

export type InputProps = {
  label?: string
  placeholder?: string
  className?: string
  errorMessage?: string
  inputIcon?: string
  disabled?: boolean
  value?: string
  onChangeValue?: (value: string) => void
  onEnter?: () => void
  onClearClick?: () => void
} & ComponentPropsWithoutRef<'input'>

function getType(type: string, showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
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
    },
    ref
  ) => {
    const isError = errorMessage ? s.error : ''

    const [showPassword, setShowPassword] = useState(false)

    const cleanTextHandler = () => {
      onClearClick?.()
    }

    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChangeValue?.(e.currentTarget.value)
    }

    const onPressEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      onEnter && e.key === 'Enter' && onEnter()
    }

    return (
      <div className={className}>
        <Typography className={s.label} variant={'body2'} as={'label'}>
          {label}
        </Typography>
        <div className={s.inputWrapper}>
          {type === 'search' ? <MagnifyingGlassIcon className={s.searchIcon} /> : null}

          {type === 'password' && (
            <button
              type={'button'}
              className={s.inputIcon}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <img src={eyeIcon} alt={'InputIcon'} /> : <EyeNoneIcon />}
            </button>
          )}

          {type === 'search' && value && (
            <button type={'button'} className={s.inputIcon} onClick={cleanTextHandler}>
              <img src={xMarkIcon} alt={'InputIcon'} />
            </button>
          )}

          <input
            value={value}
            placeholder={placeholder}
            onChange={onChangeValueHandler}
            disabled={disabled}
            className={`${isError ? isError : s.default}`}
            type={getType(type, showPassword)}
            ref={ref}
            {...restProps}
            onKeyDown={onPressEnterHandler}
          />
        </div>
        {errorMessage ? <div className={s.errorMessage}>{errorMessage}</div> : null}
      </div>
    )
  }
)
