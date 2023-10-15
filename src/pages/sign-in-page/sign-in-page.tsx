import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './sign-in-page.module.scss'

import { SignIn, SignInFormSchema } from '@/components'
import { errorOptions, LoadingSpinner, successOptions } from '@/pages'
import { useAuthMeQuery, useLoginMutation } from '@/services'

export const SignInPage = () => {
  const [login, { isLoading: isSigningIn }] = useLoginMutation()
  const { data, isLoading } = useAuthMeQuery()
  const navigate = useNavigate()

  if (isLoading) return <LoadingSpinner />
  if (data) return <Navigate to={'/'} />

  const loginHandler = (loginData: SignInFormSchema) => {
    login(loginData)
      .unwrap()
      .then(() => {
        toast.success(`Hello, You are welcome!`, successOptions)
        navigate('/')
      })
      .catch(() => {
        toast.error('Incorrect login or password', errorOptions)
      })
  }

  return (
    <div className={s.wrapper}>
      <SignIn onSubmit={loginHandler} disabled={isSigningIn} />
    </div>
  )
}
