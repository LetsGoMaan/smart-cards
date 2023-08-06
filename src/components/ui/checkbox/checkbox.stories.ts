import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxComponent } from './'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxComponent>

export default meta

type Story = StoryObj<typeof meta>

export const CheckboxStory: Story = {
  args: {
    focus: true,
  },
}

// export const CheckboxStory: Story = {
//   args: {
//     disabled: true,
//   },
// }
