import { Navigate } from 'react-router-dom'

import s from './check-email-page.module.scss'

import { CheckEmail } from '@/components'
import { LoadingSpinner } from '@/pages'
import { useAuthMeQuery } from '@/services'

export const CheckEmailPage = () => {
  const { data, isLoading } = useAuthMeQuery()

  if (isLoading) return <LoadingSpinner />
  if (data) return <Navigate to={'/'} />

  return (
    <div className={s.checkEmailWrapper}>
      <CheckEmail />
    </div>
  )
}
