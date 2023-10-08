import { useNavigate } from 'react-router-dom'

import s from './forgot-password-page.module.scss'

import { ForgotPassword, ForgotPasswordFormSchema } from '@/components'
import { useAuthMeQuery, useRecoverPasswordMutation } from '@/services'

export const ForgotPasswordPage = () => {
  const { data } = useAuthMeQuery()
  const [recoverPassword] = useRecoverPasswordMutation()
  const navigate = useNavigate()
  const onSubmitHandler = (data: ForgotPasswordFormSchema) => {
    recoverPassword(data)
    navigate('/check-email')
  }

  if (data) {
    return navigate('/')
  }

  return (
    <div className={s.forgotWrapper}>
      <ForgotPassword onSubmit={onSubmitHandler} />
    </div>
  )
}
