import type { Meta, StoryObj } from '@storybook/react'

import { TabSwitcher } from './'

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

export const Tabs: Story = {
  args: {
    defaultValue: 'Switcher',
    tabs: [
      {
        value: 'tab1',
        title: 'Switcher',
      },
      {
        value: 'tab2',
        title: 'Switcher2',
        disabled: true,
      },
      {
        value: 'tab3',
        title: 'Switcher3',
      },
    ],
    children: 'Make changes to your Switcher1 here. Click save when you are done.',
  },
  render: (args) => (
      <TabSwitcher tabs={args.tabs}></TabSwitcher>
  )
}
