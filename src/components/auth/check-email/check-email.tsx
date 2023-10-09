import { Link } from 'react-router-dom'

import s from './check-email.module.scss'

import { checkEmail } from '@/assets'
import { Button, Card, Typography } from '@/components'

export const CheckEmail = () => {
  return (
    <Card className={s.checkWrapper}>
      <Typography variant={'large'} className={s.title}>
        Check Email
      </Typography>
      <img className={s.checkImg} src={checkEmail} alt={'check email image'} />
      <Typography as={'p'} className={s.info} variant={'body2'}>
        We’ve sent an Email with instructions to example@mail.com
      </Typography>
      <Button as={Link} to={'/login'} className={s.backButton}>
        Back to Sign In
      </Button>
    </Card>
  )
}
