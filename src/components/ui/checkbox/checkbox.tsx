import { ComponentPropsWithoutRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  disabled?: boolean
  checked?: boolean
  onCheckedHandler?: () => void
  label?: string
} & ComponentPropsWithoutRef<typeof Checkbox.Root>

export const CheckboxComponent = ({
  disabled,
  checked = false,
  onCheckedHandler,
  label,
}: CheckboxProps) => {
  return (
    <div className={s.wrapper}>
      <div className={`${s.checkboxWrapper} ${disabled ? s.disabled : ''}`}>
        <Checkbox.Root
          checked={checked}
          onClick={onCheckedHandler}
          disabled={disabled}
          className={s.checkbox}
          id="c1"
        >
          <Checkbox.Indicator className={s.checkboxIndicator}>
            <CheckIcon style={{ width: '22px', height: '22px' }} className={s.checkIcon} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label className={s.label} htmlFor="c1">
        {label}
      </label>
    </div>
  )
}
