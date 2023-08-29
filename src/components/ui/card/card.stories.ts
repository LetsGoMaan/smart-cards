import type { Meta, StoryObj } from '@storybook/react'

import { Card } from './'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardStory: Story = {
  args: {
    children: '',
  },
}

// import { Card } from './card'
//
// export default { title: 'Card', component: Card }
// export const Default = {}
