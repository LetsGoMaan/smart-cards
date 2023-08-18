import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export type LoginFormSchema = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const { register, handleSubmit, control } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = (data: LoginFormSchema) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type={'text'} style={{ background: 'black' }} {...register('email')} />{' '}
      {/*должен быть наш инпут*/}
      <input type={'password'} style={{ background: 'black' }} {...register('password')} />
      {/*должен быть наш инпут*/}
      <ControlledCheckbox control={control} name={'rememberMe'} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
