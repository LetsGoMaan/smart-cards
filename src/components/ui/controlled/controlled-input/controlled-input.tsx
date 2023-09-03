import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Input, InputProps } from '@/components'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<InputProps, 'id' | 'value' | 'onChangeValue'>
export const ControlledInput = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...InputProps
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

  return <Input {...InputProps} id={name} value={value} onChangeValue={onChange} />
}
