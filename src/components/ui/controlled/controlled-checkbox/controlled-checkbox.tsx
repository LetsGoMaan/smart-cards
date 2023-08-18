import { useController, UseControllerProps } from 'react-hook-form'

import { CheckboxComponent, CheckboxProps, LoginFormSchema } from '@/components'

type Props = UseControllerProps<LoginFormSchema> &
  Omit<CheckboxProps, 'checked' | 'onValueChange' | 'id'>

export const ControlledCheckbox = ({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...checkboxProps
}: Props) => {
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
      {...checkboxProps}
      id={name}
      checked={Boolean(value)}
      onCheckedHandler={onChange}
    />
  )
}
