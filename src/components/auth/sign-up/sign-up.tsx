import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-up.module.scss'

import { Button, Card, ControlledInput, Typography } from '@/components'

type SignUpProps = {
  onSubmit: (data: SignUpFormSchema) => void
}
export type SignUpFormSchema = z.infer<typeof signUpSchema>

const signUpSchema = z
  .object({
    name: z.string().min(3).max(30).optional(),
    email: z.string().email(),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })

export const SignUp = ({ onSubmit }: SignUpProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormSchema>({ resolver: zodResolver(signUpSchema) })

  return (
    <Card className={s.signUpWrapper}>
      <Typography variant={'large'} className={s.title}>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
        <DevTool control={control} />
        <ControlledInput
          className={s.name}
          name={'name'}
          control={control}
          label={'Name'}
          errorMessage={errors.name?.message}
        />
        <ControlledInput
          className={s.email}
          name={'email'}
          control={control}
          label={'Email'}
          errorMessage={errors.email?.message}
        />
        <ControlledInput
          className={s.password}
          type={'password'}
          name={'password'}
          control={control}
          label={'Password'}
          errorMessage={errors.password?.message}
        />
        <ControlledInput
          className={`${s.password} ${s.confirm}`}
          type={'password'}
          name={'confirmPassword'}
          control={control}
          label={'Confirm Password'}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button type={'submit'} className={s.submit} fullWidth={true}>
          Sign Up
        </Button>
        <Typography as={'h4'} className={s.haveAccount} variant={'body2'}>
          Already have an account?
        </Typography>
        <Typography as={Link} to={'/login'} className={s.signUp} variant={'link1'}>
          Sign In
        </Typography>
      </form>
    </Card>
  )
}
