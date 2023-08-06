import { ComponentPropsWithoutRef } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon } from '@radix-ui/react-icons'

import s from './checkbox.module.scss'

export type CheckboxProps = ComponentPropsWithoutRef<typeof Checkbox.Root>

export const CheckboxComponent = () => {
  return (
    <Checkbox.Root className={s.checkbox}>
      <Checkbox.Indicator className={s.checkboxIndicator}>
        <CheckIcon style={{ width: '25px', height: '25px' }} className={s.checkIcon} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
