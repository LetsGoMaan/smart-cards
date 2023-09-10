import type { Meta, StoryObj } from '@storybook/react'

import { avatar } from '@/assets'
import { NameWithAvatar } from '@/components/ui'

const meta = {
  title: 'Components/NameWithAvatar',
  component: NameWithAvatar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NameWithAvatar>

export default meta
type Story = StoryObj<typeof meta>

export const NameWithAvatarStory: Story = {
  args: {
    avatar: avatar,
    name: 'Ivan',
  },
}
