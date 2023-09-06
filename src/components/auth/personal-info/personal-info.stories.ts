import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInfo } from '@/components'

const meta = {
  title: 'Auth/PersonalInfo',
  component: PersonalInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const PersonalInfoStory: Story = {
  args: {
    onSubmit: data => console.info(data),
    name: 'BestUser',
    email: 'yolo@superyolo.com',
  },
}
