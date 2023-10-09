import { useNavigate } from 'react-router-dom'

import s from './sign-up-page.module.scss'

import { SignUp, SignUpFormSchema } from '@/components'
import { useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()
  const signUpHandler = (signUpData: SignUpFormSchema) => {
    signUp({ name: signUpData.name, password: signUpData.password, email: signUpData.email })
      .unwrap()
      .then(() => navigate('/login'))
  }

  return (
    <div className={s.wrapper}>
      <SignUp onSubmit={signUpHandler} />
    </div>
  )
}
