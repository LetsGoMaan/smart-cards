import type { Meta, StoryObj } from '@storybook/react'

import { Avatar } from './'

import { avatar } from '@/assets'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const AvatarStory: Story = {
  args: {
    avatar: avatar,
  },
}
