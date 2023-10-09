import s from './check-email-page.module.scss'

import { CheckEmail } from '@/components'

export const CheckEmailPage = () => {
  return (
    <div className={s.checkEmailWrapper}>
      <CheckEmail />
    </div>
  )
}
