import { useState } from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type RadioProps = {
  disabled?: boolean
  labelText?: string
  value: string
  onValueChange?: (value: string) => void
}

export const Radio = ({ disabled, labelText, value, onValueChange }: RadioProps) => {
  const disableIndicator = disabled ? s.RadioGroupIndicatorDisabled : s.RadioGroupIndicator

  const [radioValue, setRadioValue] = useState(value)

  const radioHandler = (value: string) => {
    setRadioValue(value)
    onValueChange && onValueChange(value)
  }

  return (
    <form>
      <RadioGroup.Root
        className={s.radioGroupRoot}
        defaultValue="default"
        aria-label="View density"
        value={radioValue}
        onValueChange={radioHandler}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item disabled={disabled} className={s.radioGroupItem} value="default" id="r1">
            <RadioGroup.Indicator className={disableIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r1">
            {labelText}
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item className={s.radioGroupItem} value="comfortable" id="r2">
            <RadioGroup.Indicator className={s.radioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r2">
            Comfortable
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item className={s.radioGroupItem} value="compact" id="r3">
            <RadioGroup.Indicator className={s.radioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.label} htmlFor="r3">
            Compact
          </label>
        </div>
      </RadioGroup.Root>
    </form>
  )
}
