import { ReactNode } from 'react'

import * as DropdownRadix from '@radix-ui/react-dropdown-menu'

import s from './dropDownMenu.module.scss'

export type DropDownMenuProps = {
  isMenuOpen?: boolean
  onChange?: (open: boolean) => void
  trigger?: ReactNode
  children?: ReactNode
  align?: 'start' | 'center' | 'end'
}
export const DropDownMenu = ({ trigger, children, align }: DropDownMenuProps) => {
  return (
    <DropdownRadix.Root>
      <DropdownRadix.Trigger asChild>
        <button className={s.buttonTrigger} aria-label="Customise options">
          {trigger}
        </button>
      </DropdownRadix.Trigger>
      <DropdownRadix.Portal>
        <DropdownRadix.Content className={s.content} sideOffset={6} align={align}>
          {children}
          <DropdownRadix.Arrow className={s.arrowWrapper} asChild>
            <div className={s.arrow} />
          </DropdownRadix.Arrow>
        </DropdownRadix.Content>
      </DropdownRadix.Portal>
    </DropdownRadix.Root>
  )
}

type ItemProps = {
  children?: ReactNode
}
export const DropDownItem = ({ children }: ItemProps) => {
  return (
    <>
      <DropdownRadix.Item className={s.item}>{children}</DropdownRadix.Item>
      <DropdownRadix.Separator className={s.separator} />
    </>
  )
}
