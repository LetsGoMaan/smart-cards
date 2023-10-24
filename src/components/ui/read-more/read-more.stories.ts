import type { Meta, StoryObj } from '@storybook/react'

import { ReadMore } from './'

const meta = {
  title: 'Components/ReadMore',
  component: ReadMore,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ReadMore>

export default meta
type Story = StoryObj<typeof meta>

export const ReadMoreStory: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incididunt ut sed eiusmod tempoei usmodr sit amet, consectetur adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut sed do eiusmod tempoei usmodr sit amet, consectetur adipiscing elit, sed do.',
  },
}

export const ShortText: Story = {
  args: {
    text: 'Lorem ipsum.',
  },
}
