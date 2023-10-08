import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import s from './forgot-password.module.scss'

import { Button, Card, ControlledInput, Typography } from '@/components'

type ForgotPasswordProps = {
  onSubmit: (data: ForgotPasswordFormSchema) => void
}

export type ForgotPasswordFormSchema = z.infer<typeof ForgotPasswordSchema>

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const ForgotPassword = ({ onSubmit }: ForgotPasswordProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ForgotPasswordFormSchema>({ resolver: zodResolver(ForgotPasswordSchema) })

  return (
    <Card className={s.forgotWrapper}>
      <Typography variant={'large'} className={s.title}>
        Forgot your password?
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
        <Typography as={'p'} className={s.info} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button type={'submit'} className={s.buttonSubmit} fullWidth={true}>
          Send Instructions
        </Button>
        <Typography as={'p'} className={s.rememberPassword} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Typography as={Link} to={'/sign-in-page'} className={s.trySignIn} variant={'link1'}>
          Try logging in
        </Typography>
      </form>
    </Card>
  )
}
