import { useState } from 'react'

import * as SelectRadixUI from '@radix-ui/react-select'

import arrowDown from './../../../assets/arrow-down.svg'
import arrowUp from './../../../assets/arrow-up.svg'
import s from './select.module.scss'

export type Options = {
  value: string
  disabled?: boolean
}
type SelectProps = {
  titleValue: string
  selectOptions: Options[]
  onChange?: (value: string) => void
}
export const Select = ({ titleValue, selectOptions, onChange }: SelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(titleValue)
  const [isOpen, setIsOpen] = useState(false)
  const changeArrow = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectChange = (value: string) => {
    onChange && onChange(value)
    setSelectedValue(value)
  }

  const filteredOptions = selectOptions.filter(option => option.value !== selectedValue)

  return (
    <div onClick={changeArrow}>
      <SelectRadixUI.Root
        value={selectedValue}
        onValueChange={handleSelectChange}
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen)
        }}
      >
        <SelectRadixUI.Trigger className={s.trigger}>
          <SelectRadixUI.Value>{selectedValue}</SelectRadixUI.Value>
          <SelectRadixUI.Icon className={s.icon}>
            <span>
              <img src={isOpen ? arrowUp : arrowDown} alt={'arrow'} />
            </span>
          </SelectRadixUI.Icon>
        </SelectRadixUI.Trigger>

        <SelectRadixUI.Portal>
          <SelectRadixUI.Content className={s.selectContent}>
            <SelectRadixUI.Viewport className={s.viewport}>
              <SelectRadixUI.Group className={s.group}>
                {filteredOptions.map(option => {
                  return (
                    <SelectRadixUI.Item
                      key={option.value}
                      className={s.selectItem}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      <SelectRadixUI.ItemText>{option.value}</SelectRadixUI.ItemText>
                    </SelectRadixUI.Item>
                  )
                })}
              </SelectRadixUI.Group>
            </SelectRadixUI.Viewport>
          </SelectRadixUI.Content>
        </SelectRadixUI.Portal>
      </SelectRadixUI.Root>
    </div>
  )
}
