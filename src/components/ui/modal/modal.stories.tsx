import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from './'

import { Button, Input, Select } from '@/components/ui'

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
    showCloseButton: true,
    children: '',
    /*children: (
          <>
            <Input type={'search'} />
            <Input type={'search'} />
          </>
        ),*/
    title: 'Title',
  },
  render: args => {
    const [open, setOpen] = useState(false)

    function handleModalOpened() {
      setOpen(true)
    }

    function handleModalClosed(value: boolean) {
      setOpen(value)
    }

    return (
      <div>
        <Button onClick={handleModalOpened}>Open modal</Button>
        <Modal
          isOpen={open}
          onClose={handleModalClosed}
          showCloseButton={args.showCloseButton}
          title={args.title}
        >
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
      </div>
    )
  },
}
