import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from './'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const RadioStory: Story = {
  args: {
    disabled: true,
    labelText: 'Default',
  },
}

export const RadioStoryDisabled: Story = {
  args: {
    disabled: true,
    labelText: 'Disabled',
  },
}
