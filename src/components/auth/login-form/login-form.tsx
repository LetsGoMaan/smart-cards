import { SubmitHandler, useController, useForm } from 'react-hook-form'

import { Button, CheckboxComponent, Input } from '@/components/ui'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>()

  const {
    field: { value, onChange },
  } = useController({ name: 'rememberMe', control, defaultValue: false })

  /*const {
    field: { value: emailValue, onChange: onEmailChange },
  } = useController({ name: 'email', control, defaultValue: '' })

  const {
    field: { value: passwordValue, onChange: onPasswordChange },
  } = useController({ name: 'password', control, defaultValue: '' })*/

  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

  const MIN_PASSWORD_LENGTH = 3

  const onSubmit: SubmitHandler<FormValues> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type={'email'}
        label={'email'}
        {...register('email', {
          required: 'Email is required',
          pattern: { value: emailRegex, message: 'Invalid email' },
        })}
        errorMessage={errors.email?.message}
      />
      {/*<Input type={'text'} label={'email'} value={emailValue} onChange={onEmailChange} />*/}

      <Input
        type={'password'}
        label={'password'}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: MIN_PASSWORD_LENGTH,
            message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
          },
        })}
        errorMessage={errors.password?.message}
      />
      {/*<Input
        type={'password'}
        label={'password'}
        value={passwordValue}
        onChange={onPasswordChange}
      />*/}

      <CheckboxComponent checked={value} onCheckedHandler={onChange} label={'remember me'} />

      <Button type="submit">Submit</Button>
    </form>
  )
}
