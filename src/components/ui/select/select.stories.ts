import type { Meta, StoryObj } from '@storybook/react'

import { Select } from './'

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    selectOptions: [],
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {
    titleValue: 'Select-box',
    selectOptions: [
      { value: 'Select-box 1' },
      { value: 'Select-box 2' },
      { value: 'Select-box 3' },
    ],
  },
}

export const SelectStoryWithDisabled: Story = {
  args: {
    titleValue: 'Select-box',
    selectOptions: [
      { value: 'Select-box 1' },
      { value: 'Select-box 2', disabled: true },
      { value: 'Select-box 3' },
    ],
  },
}
