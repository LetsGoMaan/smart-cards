import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { CheckboxComponent, CheckboxProps } from '@/components'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onValueChange' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...checkboxProps
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return (
    <CheckboxComponent
      {...{ ...checkboxProps, id: name, checked: value, onCheckedHandler: onChange }}
    />
  )
}
