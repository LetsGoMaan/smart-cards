import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './forgot-password-page.module.scss'

import { ForgotPassword, ForgotPasswordFormSchema } from '@/components'
import { errorOptions } from '@/pages'
import { useAuthMeQuery, useRecoverPasswordMutation } from '@/services'

export const ForgotPasswordPage = () => {
  const { data, isLoading } = useAuthMeQuery()
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()
  const onSubmitHandler = (data: ForgotPasswordFormSchema) => {
    recoverPassword({
      email: data.email,
      html: '<h1>Hi, ##name##</h1><p>Click <a href="https://smart-cards-7sxyig9bd-letsgomaan.vercel.app/confirm-email/##token##">here</a> to recover your password</p>',
    })
      .unwrap()
      .then(() => {
        navigate('/check-email')
      })
      .catch(e => {
        toast.error(e.data.message, errorOptions)
      })
  }

  if (isLoading) return <div>loading...</div>
  if (data) return <Navigate to={'/'} />

  return (
    <div className={s.forgotWrapper}>
      <ForgotPassword onSubmit={onSubmitHandler} />
    </div>
  )
}
