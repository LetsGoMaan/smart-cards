import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { CheckboxComponent, CheckboxProps } from '@/components'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onCheckedHandler' | 'id'>
export const ControlledCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...checkBoxProps
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <CheckboxComponent {...checkBoxProps} id={name} checked={value} onCheckedHandler={onChange} />
  )
}
