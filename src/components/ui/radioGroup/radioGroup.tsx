import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

type RadioProps = {
  disabled?: boolean
  labelText?: string
}

export const Radio = ({ disabled, labelText }: RadioProps) => {
  const disableIndicator = disabled ? s.RadioGroupIndicatorDisabled : s.RadioGroupIndicator

  return (
    <form>
      <RadioGroup.Root
        className={s.RadioGroupRoot}
        defaultValue="default"
        aria-label="View density"
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item disabled={disabled} className={s.RadioGroupItem} value="default" id="r1">
            <RadioGroup.Indicator className={disableIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r1">
            {labelText}
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item className={s.RadioGroupItem} value="comfortable" id="r2">
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r2">
            Comfortable
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <RadioGroup.Item className={s.RadioGroupItem} value="compact" id="r3">
            <RadioGroup.Indicator className={s.RadioGroupIndicator} />
          </RadioGroup.Item>
          <label className={s.Label} htmlFor="r3">
            Compact
          </label>
        </div>
      </RadioGroup.Root>
    </form>
  )
}
