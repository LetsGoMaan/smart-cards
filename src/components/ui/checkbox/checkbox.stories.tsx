import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { CheckboxComponent } from './'

const meta = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxComponent>

export default meta

type Story = StoryObj<typeof meta>

export const CheckboxStory: Story = {
  render: args => {
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <>
        <CheckboxComponent
          {...args}
          checked={checkedValue}
          onCheckedHandler={() => setCheckedValue(!checkedValue)}
        />
      </>
    )
  },
  args: {},
}

export const CheckboxStoryDisabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
}

export const CheckboxStoryWithLabel: Story = {
  render: args => {
    const [checkedValue, setCheckedValue] = useState(false)

    return (
      <>
        <CheckboxComponent
          {...args}
          checked={checkedValue}
          onCheckedHandler={() => setCheckedValue(!checkedValue)}
        />
      </>
    )
  },
  args: {
    label: 'Yolo',
  },
}
