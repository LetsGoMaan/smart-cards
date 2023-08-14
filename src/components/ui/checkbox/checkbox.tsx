import { ComponentPropsWithoutRef, useState } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type CheckboxProps = {
  disabled?: boolean
  checked?: boolean
  onCheckedHandler?: (value: boolean) => void
} & ComponentPropsWithoutRef<typeof Checkbox.Root>

export const CheckboxComponent = ({
  disabled,
  checked = false,
  onCheckedHandler,
}: CheckboxProps) => {
  const [checkedValue, setCheckedValue] = useState<boolean>(checked)
  const handleCheckboxChange = (value: boolean) => {
    onCheckedHandler && onCheckedHandler(value)
    setCheckedValue(value)
  }

  return (
    <Checkbox.Root
      checked={checkedValue}
      onCheckedChange={handleCheckboxChange}
      disabled={disabled}
      className={s.checkbox}
    >
      <Checkbox.Indicator className={s.checkboxIndicator}>
        <CheckIcon style={{ width: '22px', height: '22px' }} className={s.checkIcon} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
