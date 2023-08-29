import * as RadioGroup from '@radix-ui/react-radio-group'

import s from './radioGroup.module.scss'

import { Typography } from '@/components/ui'

type RadioProps = {
  className?: string
  options?: any[]
  onChangeOption?: (option: any) => void
  isDisabled?: boolean
}

export const Radio = ({ isDisabled = false, options, className, onChangeOption }: RadioProps) => {
  return (
    <>
      <RadioGroup.Root className={`${s.root} ${className}`} onValueChange={onChangeOption}>
        {options?.map(o => {
          return (
            <div className={s.itemGroup} key={o.id}>
              <div className={`${s.itemWrapper} ${isDisabled ? s.disabled : ''}`}>
                <RadioGroup.Item className={s.item} disabled={isDisabled} value={o.id} id={o.id}>
                  <RadioGroup.Indicator className={s.indicator} />
                </RadioGroup.Item>
              </div>
              <label className={`${s.label} ${isDisabled ? s.labelDisabled : ''}`} htmlFor={o.id}>
                <Typography className={s.labelText} as={'h4'} variant={'body2'}>
                  {o.value}
                </Typography>
              </label>
            </div>
          )
        })}
      </RadioGroup.Root>
    </>
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <RadioGroup.Item
    //         disabled={isDisabled}
    //         className={s.radioGroupItem}
    //         value="default"
    //         id="r1"
    //       >
    //         <RadioGroup.Indicator className={disableIndicator} />
    //       </RadioGroup.Item>
    //       <label className={s.label} htmlFor="r1">
    //         {labelText}
    //       </label>
    //     </div>
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <RadioGroup.Item className={s.radioGroupItem} value="comfortable" id="r2">
    //         <RadioGroup.Indicator className={s.radioGroupIndicator} />
    //       </RadioGroup.Item>
    //       <label className={s.label} htmlFor="r2">
    //         Comfortable
    //       </label>
    //     </div>
    //     <div style={{ display: 'flex', alignItems: 'center' }}>
    //       <RadioGroup.Item className={s.radioGroupItem} value="compact" id="r3">
    //         <RadioGroup.Indicator className={s.radioGroupIndicator} />
    //       </RadioGroup.Item>
    //       <label className={s.label} htmlFor="r3">
    //         Compact
    //       </label>
    //     </div>
    //   </RadioGroup.Root>
    // </form>
  )
}
