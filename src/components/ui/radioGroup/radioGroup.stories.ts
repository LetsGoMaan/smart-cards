import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from './'

// const meta = {
//   title: 'Components/Radio',
//   component: Radio,
//   tags: ['autodocs'],
//   argTypes: {},
// } satisfies Meta<typeof Radio>
//
// export default meta
// type Story = StoryObj<typeof meta>
//
// export const RadioStory: Story = {
//   args: {
//     disabled: false,
//     labelText: 'Default',
//   },
// }
//
// export const RadioStoryDisabled: Story = {
//   args: {
//     disabled: true,
//     labelText: 'Disabled',
//   },
// }

const meta = {
  title: 'Components/RadioGroup',
  component: Radio,
  tags: ['autodocs'],
  argTypes: { onChangeOption: { action: 'radio changes' } },
} satisfies Meta<typeof Radio>

const people = [
  { id: 1, value: 'Gear 2' },
  { id: 2, value: 'Gear 3' },
  { id: 3, value: 'Boundo Man' },
  { id: 4, value: 'Snake Man' },
  { id: 5, value: 'Nika Man' },
]

export default meta
type Story = StoryObj<typeof meta>

export const ShowRadioGroupActive: Story = {
  args: {
    options: people,
    isDisabled: false,
  },
}

export const ShowRadioGroupNotActive: Story = {
  args: {
    isDisabled: true,
    options: people,
  },
}
