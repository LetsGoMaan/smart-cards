import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './'

import { Input, Select } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalStory: Story = {
  args: {
    isOpen: true,
    isCloseMark: true,
    children: '',
    title: 'Title',
  },
  render: args => (
    <Modal isOpen={args.isOpen} isCloseMark={args.isCloseMark} title={args.title}>
      <Select
        selectOptions={[
          { value: 'Select-box 1' },
          { value: 'Select-box 2' },
          { value: 'Select-box 3' },
        ]}
        titleValue={'Select-box'}
      />
      <Input type={'search'} />
      <Input type={'search'} />
    </Modal>
  ),
}
