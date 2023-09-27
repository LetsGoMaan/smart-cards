import s from './sign-up-page.module.scss'

import { SignUp } from '@/components'
import { useSignUpMutation } from '@/services'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()

  return (
    <div className={s.wrapper}>
      <SignUp onSubmit={({ email, password }) => signUp({ email, password })} />
    </div>
  )
}
