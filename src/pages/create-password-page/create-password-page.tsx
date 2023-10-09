import { useNavigate, useParams } from 'react-router-dom'

import s from './create-password-page.module.scss'

import { CreatePassword, CreatePasswordFormSchema } from '@/components'
import { useConfirmPasswordMutation } from '@/services'

export const CreatePasswordPage = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [confirmPassword] = useConfirmPasswordMutation()
  const onSubmitHandler = (data: CreatePasswordFormSchema) => {
    confirmPassword({ token, password: data.password })
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  return (
    <div className={s.createWrapper}>
      <CreatePassword onSubmit={onSubmitHandler} />
    </div>
  )
}
