import * as SliderRadixUI from '@radix-ui/react-slider'

import s from './slider.module.scss'

import { Typography } from '@/components/ui'

type SliderProps = {
  min?: number
  max?: number
  value: number[]
  step?: number
  onChange?: (value: number[]) => void
  label?: string
}
export const Slider = ({ min, max, value, step = 1, onChange, label }: SliderProps) => {
  return (
    <div className={s.container}>
      <Typography variant={'body2'} as={'label'} className={s.label}>
        {label}
      </Typography>
      <div className={s.sliderWrapper}>
        <div className={s.minMax}>
          <Typography as={'h3'} variant={'body1'} className={s.value}>
            {value[0]}
          </Typography>
        </div>
        <SliderRadixUI.Root
          className={s.root}
          value={value}
          onValueChange={onChange}
          min={min}
          max={max}
          step={step}
        >
          <SliderRadixUI.Track className={s.track}>
            <SliderRadixUI.Range className={s.range} />
          </SliderRadixUI.Track>
          <SliderRadixUI.Thumb className={s.thumb} aria-label="Volume" />
          <SliderRadixUI.Thumb className={s.thumb} aria-label="Volume" />
        </SliderRadixUI.Root>
        <div className={s.minMax}>
          <Typography as={'h3'} variant={'body1'} className={s.value}>
            {value[1]}
          </Typography>
        </div>
      </div>
    </div>
  )
}
