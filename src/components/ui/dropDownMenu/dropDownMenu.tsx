import { ReactNode } from 'react'

import * as DropdownRadix from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

import s from './dropDownMenu.module.scss'

export type DropDownMenuProps = {
  isMenuOpen?: boolean
  onChange?: (open: boolean) => void
  trigger?: ReactNode
  children?: ReactNode
  align?: 'start' | 'center' | 'end'
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}
const motionItem = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const DropDownMenu = ({
  trigger,
  children,
  align,
  isMenuOpen,
  onChange,
}: DropDownMenuProps) => {
  return (
    <DropdownRadix.Root onOpenChange={onChange} open={isMenuOpen}>
      <DropdownRadix.Trigger asChild>
        <button className={s.buttonTrigger} aria-label="Customise options">
          {trigger}
        </button>
      </DropdownRadix.Trigger>
      <DropdownRadix.Portal>
        <DropdownRadix.Content className={s.contentWrapper} sideOffset={6} align={align}>
          <motion.div className={s.content} variants={container} initial="hidden" animate="visible">
            {children}
          </motion.div>
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
      <motion.div variants={motionItem}>
        <DropdownRadix.Item className={s.item}>{children}</DropdownRadix.Item>
      </motion.div>
      <DropdownRadix.Separator className={s.separator} />
    </>
  )
}
