import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './sign-in.module.scss'

import { Button, Card, ControlledCheckbox, ControlledInput, Typography } from '@/components'

type SignInProps = {
  onSubmit: (data: SignInFormSchema) => void
}
export type SignInFormSchema = z.infer<typeof signInSchema>

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().default(false),
})

export const SignIn = ({ onSubmit }: SignInProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormSchema>({ resolver: zodResolver(signInSchema) })

  return (
    <Card className={s.signInWrapper}>
      <Typography variant={'large'} className={s.title}>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
        <DevTool control={control} />
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
        <ControlledCheckbox
          className={s.rememberMe}
          name={'rememberMe'}
          control={control}
          label={'Remember me'}
        />
        <Typography
          as={Link}
          to={'/forgot-password'}
          className={s.forgotPassword}
          variant={'body2'}
        >
          Forgot Password?
        </Typography>
        <Button type={'submit'} className={s.buttonSubmit} fullWidth={true}>
          Sign In
        </Button>
        <Typography as={'h4'} className={s.haveAccount} variant={'body2'}>
          Don`t have an account?
        </Typography>
        <Typography as={Link} to={'/sign-up'} className={s.signUp} variant={'link1'}>
          Sign Up
        </Typography>
      </form>
    </Card>
  )
}
