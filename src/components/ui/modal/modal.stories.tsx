import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    /*variant: {
              options: ['primary', 'secondary', 'tertiary', 'link'],
              control: { type: 'radio' },
            },*/
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalStory: Story = {
  args: {
    isOpen: true,
    isCloseMark: true,
    children: 'Hi',
    title: 'Title',
  },
}
