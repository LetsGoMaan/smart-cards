import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  //argTypes: {},
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

const commonArgs = {
  min: 0,
  max: 10,
  value: [2, 8],
  onChange: () => {},
}

export const SliderStory: Story = {
  render: args => {
    const [sliderValue, setSliderValue] = useState<number[]>(commonArgs.value)

    function onChangeHandler(value: number[]) {
      setSliderValue(value)
    }

    return <Slider {...args} value={sliderValue} onChange={onChangeHandler} />
  },
  args: {
    ...commonArgs,
  },
}
