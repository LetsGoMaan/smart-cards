import { ReactNode } from 'react'

import * as TabsRadixUI from '@radix-ui/react-tabs'

import s from './tabSwitcher.module.scss'

import { Typography } from '@/components/ui'

export type TabType = {
  /** A unique value that associates the trigger with a content. */
  value: string
  title: string
  disabled?: boolean
}
type TabSwitcherProps = {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  tabs: TabType[]
  children?: ReactNode
  label?: string
}
export const TabSwitcher = ({
  tabs,
  children,
  defaultValue,
  value,
  onValueChange,
  label,
}: TabSwitcherProps) => {
  return (
    <div>
      <Typography className={s.title} variant={'body2'}>
        {label}
      </Typography>
      <TabsRadixUI.Root
        className={s.root}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        <TabsRadixUI.List className={s.list}>
          {tabs.map(tab => {
            return (
              <TabsRadixUI.Trigger
                key={tab.value}
                className={s.trigger}
                value={tab.value}
                disabled={tab.disabled}
              >
                {tab.title}
              </TabsRadixUI.Trigger>
            )
          })}
        </TabsRadixUI.List>
        {children}
      </TabsRadixUI.Root>
    </div>
  )
}

export type TabContentProps = {
  /** A unique value that associates the trigger with a content. */
  value: string
  children?: ReactNode
}

export const TabContent = ({ value, children }: TabContentProps) => {
  return (
    <TabsRadixUI.Content className={s.content} value={value}>
      {children}
    </TabsRadixUI.Content>
  )
}
