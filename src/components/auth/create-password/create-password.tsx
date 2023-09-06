import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './create-password.module.scss'

import { Button, Card, ControlledInput, Typography } from '@/components'

type CreatePasswordProps = {
  onSubmit: (data: CreatePasswordFormSchema) => void
}

type CreatePasswordFormSchema = z.infer<typeof CreatePasswordSchema>

const CreatePasswordSchema = z.object({
  password: z.string().min(3, { message: 'Password must contain at least 3 character(s)' }),
})

export const CreatePassword = ({ onSubmit }: CreatePasswordProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePasswordFormSchema>({ resolver: zodResolver(CreatePasswordSchema) })

  return (
    <Card className={s.createWrapper}>
      <Typography variant={'large'} className={s.title}>
        Create new password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={s.formWrapper}>
        <DevTool control={control} />
        <ControlledInput
          type={'password'}
          className={s.password}
          name={'password'}
          control={control}
          label={'Password'}
          errorMessage={errors.password?.message}
        />
        <Typography as={'p'} className={s.info} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button type={'submit'} className={s.buttonSubmit} fullWidth={true}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
