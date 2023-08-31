import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useController, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, CheckboxComponent, Input } from '@/components/ui'

type LoginFormSchema = z.infer<typeof loginSchema>

const MIN_PASSWORD_LENGTH = 3

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
  rememberMe: z.boolean().default(false),
})

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginSchema) })

  const {
    field: { value, onChange },
  } = useController({ name: 'rememberMe', control, defaultValue: false })

  const onSubmit: SubmitHandler<LoginFormSchema> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type={'email'}
        label={'email'}
        {...register('email')}
        errorMessage={errors.email?.message}
      />

      <Input
        type={'password'}
        label={'password'}
        {...register('password')}
        errorMessage={errors.password?.message}
      />

      <CheckboxComponent checked={value} onCheckedHandler={onChange} label={'remember me'} />

      <Button type="submit">Submit</Button>
    </form>
  )
}
