import type { Meta, StoryObj } from '@storybook/react'

import eyeIcon from './../../../assets/eye.svg'
import searchIcon from './../../../assets/search.svg'

import { Input } from './'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputStory: Story = {
  args: {
    placeholder: 'Input',
    type: 'text',
  },
}

export const InputStoryWithError: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input with error',
    errorMessage: 'Error',
    type: 'text',
  },
}

export const InputStoryWithEyeIcon: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input with password',
    inputIcon: `${eyeIcon}`,
    type: 'password',
  },
}

export const InputStoryWithSearchIcon: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input with search',
    inputIcon: `${searchIcon}`,
    type: 'search',
  },
}

export const InputStoryDisabled: Story = {
  args: {
    label: 'Input',
    placeholder: 'Just Input',
    inputIcon: `${searchIcon}`,
    type: 'text',
    disabled: true,
  },
}
