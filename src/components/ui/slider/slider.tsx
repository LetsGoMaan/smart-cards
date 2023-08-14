import { useState } from 'react'

import * as SliderRadixUI from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { Typography } from '@/components/ui'

type SliderProps = {
  min: number
  max: number
  value1: number
  value2: number
  step?: number
  onChange?: (value: number[]) => void
}
export const Slider = ({ min, max, value1, value2, step = 1, onChange }: SliderProps) => {
  const [values, setValues] = useState<number[]>([value1, value2])
  const change = (newValues: number[] | number) => {
    if (Array.isArray(newValues)) {
      setValues(newValues)
      onChange && onChange(newValues)
    }
  }

  return (
    <div className={s.sliderWrapper}>
      <div className={s.minMax}>
        <Typography as={'h3'} variant={'body1'} className={s.value}>
          {values[0]}
        </Typography>
      </div>
      <form>
        <SliderRadixUI.Root
          className={s.root}
          value={values}
          onValueCommit={change}
          onValueChange={change}
          min={min}
          max={max}
          step={step}
        >
          <SliderRadixUI.Track className={s.track}>
            <SliderRadixUI.Range className={s.range} />
          </SliderRadixUI.Track>
          <SliderRadixUI.Thumb className={s.thumb} />
          <SliderRadixUI.Thumb className={s.thumb} />
        </SliderRadixUI.Root>
      </form>
      <div className={s.minMax}>
        <Typography as={'h3'} variant={'body1'} className={s.value}>
          {values[1]}
        </Typography>
      </div>
    </div>
  )
}
