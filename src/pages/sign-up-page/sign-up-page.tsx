import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './sign-up-page.module.scss'

import { SignUp, SignUpFormSchema } from '@/components'
import { errorOptions, LoadingSpinner } from '@/pages'
import { useAuthMeQuery, useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const { data, isLoading } = useAuthMeQuery()
  const [signUp, { isLoading: isSigningUp }] = useSignUpMutation()
  const navigate = useNavigate()
  const signUpHandler = (signUpData: SignUpFormSchema) => {
    signUp({ name: signUpData.name, password: signUpData.password, email: signUpData.email })
      .unwrap()
      .then(() => navigate('/login'))
      .catch(() => {
        toast.error('Email already exists', errorOptions)
      })
  }

  if (isLoading || isSigningUp) return <LoadingSpinner />
  if (data) return <Navigate to={'/'} />

  return (
    <div className={s.wrapper}>
      <SignUp onSubmit={signUpHandler} />
    </div>
  )
}
