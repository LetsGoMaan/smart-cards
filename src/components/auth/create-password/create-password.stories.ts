import type { Meta, StoryObj } from '@storybook/react'

import { CreatePassword } from './create-password.tsx'

const meta = {
  title: 'Auth/CreatePassword',
  component: CreatePassword,
  tags: ['autodocs'],
} satisfies Meta<typeof CreatePassword>

export default meta
type Story = StoryObj<typeof meta>

export const CreatePasswordStory: Story = {
  args: {
    onSubmit: data => console.info(data),
  },
}
