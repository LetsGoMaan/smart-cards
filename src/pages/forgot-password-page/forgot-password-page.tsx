import { Navigate, useNavigate } from 'react-router-dom'

import s from './forgot-password-page.module.scss'

import { ForgotPassword, ForgotPasswordFormSchema } from '@/components'
import { useAuthMeQuery, useRecoverPasswordMutation } from '@/services'

export const ForgotPasswordPage = () => {
  const { data } = useAuthMeQuery()
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()
  const onSubmitHandler = (data: ForgotPasswordFormSchema) => {
    recoverPassword({
      email: data.email,
      // html: '<h1>Hi, ##name##</h1><p>Click <a href="https://smart-cards-7sxyig9bd-letsgomaan.vercel.app/confirm-email/##token##">here</a> to recover your password</p>',
      html: '<h1>Hi, ##name##</h1><p>Click <a href="https://smart-cards.vercel.app/confirm-email/##token##">here</a> to recover your password</p>',
    })
    navigate('/check-email')
  }

  if (data) return <Navigate to={'/'} />

  return (
    <div className={s.forgotWrapper}>
      <ForgotPassword onSubmit={onSubmitHandler} />
    </div>
  )
}
