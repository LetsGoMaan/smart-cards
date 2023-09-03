import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'
import { ControlledInput } from '@/components/ui/controlled/controlled-input/controlled-input.tsx'

export type LoginFormSchema = z.infer<typeof loginSchema>

const MIN_PASSWORD_LENGTH = 3

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(MIN_PASSWORD_LENGTH),
  rememberMe: z.boolean().default(false),
  yolo: z.string().min(3),
})

export const LoginForm = () => {
  const {
    //register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchema>({ resolver: zodResolver(loginSchema) })

  const onSubmit: SubmitHandler<LoginFormSchema> = data => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DevTool control={control} />
      {/*<Input
        type={'email'}
        label={'email'}
        {...register('email')}
        errorMessage={errors.email?.message}
      />*/}

      <ControlledInput
        type={'email'}
        name={'email'}
        control={control}
        label={'email'}
        errorMessage={errors.email?.message}
      />

      {/*<Input
        type={'password'}
        label={'password'}
        {...register('password')}
        errorMessage={errors.password?.message}
      />*/}

      <ControlledInput
        type={'password'}
        name={'password'}
        control={control}
        label={'password'}
        errorMessage={errors.password?.message}
      />

      <ControlledCheckbox name={'rememberMe'} control={control} label={'remember me'} />

      <Button type="submit">Submit</Button>
    </form>
  )
}
