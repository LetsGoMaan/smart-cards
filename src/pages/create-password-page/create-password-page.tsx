import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './create-password-page.module.scss'

import { CreatePassword, CreatePasswordFormSchema } from '@/components'
import { successOptions } from '@/pages'
import { useAuthMeQuery, useConfirmPasswordMutation } from '@/services'

export const CreatePasswordPage = () => {
  const { data, isLoading } = useAuthMeQuery()
  const { token } = useParams()
  const navigate = useNavigate()
  const [confirmPassword] = useConfirmPasswordMutation()
  const onSubmitHandler = (data: CreatePasswordFormSchema) => {
    confirmPassword({ token, password: data.password })
      .unwrap()
      .then(() => {
        toast.success('Your password changed successfully. Please Sign In now!', successOptions)
        navigate('/login')
      })
  }

  if (isLoading) return <div>loading...</div>
  if (data) return <Navigate to={'/'} />

  return (
    <div className={s.createWrapper}>
      <CreatePassword onSubmit={onSubmitHandler} />
    </div>
  )
}
