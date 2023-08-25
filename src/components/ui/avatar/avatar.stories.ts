import type { Meta, StoryObj } from '@storybook/react'

import avatar from './../../../assets/avatar.png'

import { Avatar } from './'

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
