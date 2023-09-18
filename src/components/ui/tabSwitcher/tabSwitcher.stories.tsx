import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher, TabContent } from './'

const meta = {
  title: 'Components/TabSwitcher',
  component: TabSwitcher,
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      options: [],
    },
  },
} satisfies Meta<typeof TabSwitcher>

export default meta
type Story = StoryObj<typeof meta>

const tabs = [
  {
    value: 'tab1',
    title: 'Switcher',
  },
  {
    value: 'tab2',
    title: 'Switcher2',
    disabled: false,
  },
  {
    value: 'tab3',
    title: 'Switcher3',
  },
]

export const Tabs: Story = {
  args: {
    label: 'Title',
    defaultValue: 'tab1',
    tabs: tabs,
    children: (
      <>
        <TabContent value={tabs[0].value}>Content for Switcher.</TabContent>
        <TabContent value={tabs[1].value}>Content for Switcher2.</TabContent>
        <TabContent value={tabs[2].value}>Content for Switcher3.</TabContent>
      </>
    ),
  },
}

export const TabsWithDisabled: Story = {
  args: {
    label: 'Title',
    defaultValue: 'tab1',
    tabs: [
      {
        value: 'tab1',
        title: 'SwitcherA',
      },
      {
        value: 'tab2',
        title: 'SwitcherB',
        disabled: true,
      },
      {
        value: 'tab3',
        title: 'SwitcherC',
      },
    ],
    children: (
      <>
        <TabContent value={tabs[0].value}>Content for Switcher.</TabContent>
        <TabContent value={tabs[1].value}>Content for Switcher2.</TabContent>
        <TabContent value={tabs[2].value}>Content for Switcher3.</TabContent>
      </>
    ),
  },
}
