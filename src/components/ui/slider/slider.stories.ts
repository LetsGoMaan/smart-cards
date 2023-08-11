import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    /*variant: {
          options: ['primary', 'secondary', 'tertiary', 'link'],
          control: { type: 'radio' },
        },*/
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderStory: Story = {
  args: {
    min: 1,
    max: 10,
    value1: 2,
    value2: 8,
  },
}
