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

export const Tabs: Story = {
  args: {
    defaultValue: 'tab1',
    tabs: [
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
    ],
  },
  render: args => (
    <TabSwitcher defaultValue={args.defaultValue} tabs={args.tabs}>
      <TabContent value={args.tabs[0].value}>Content for Switcher.</TabContent>
      <TabContent value={args.tabs[1].value}>Content for Switcher2.</TabContent>
      <TabContent value={args.tabs[2].value}>Content for Switcher3.</TabContent>
    </TabSwitcher>
  ),
}

export const TabsWithDisabled: Story = {
  args: {
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
  },
  render: args => (
    <TabSwitcher defaultValue={args.defaultValue} tabs={args.tabs}>
      <TabContent value={args.tabs[0].value}>Content for SwitcherA.</TabContent>
      <TabContent value={args.tabs[1].value}>Content for SwitcherB.</TabContent>
      <TabContent value={args.tabs[2].value}>Content for SwitcherC.</TabContent>
    </TabSwitcher>
  ),
}
