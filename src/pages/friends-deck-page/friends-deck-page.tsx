import s from './friends-deck-page.module.scss'

import { Button, Input, Typography } from '@/components'
import { BackButton } from '@/pages'
export const FriendsDeckPage = () => {
  return (
    <>
      <BackButton />
      <div className={s.titleAndButton}>
        <Typography className={s.namePack} variant={'large'}>
          Friend&aposs Pack
        </Typography>
        <Button>
          <Typography variant={'subtitle2'} as={'h4'}>
            Learn to Pack
          </Typography>
        </Button>
      </div>
      <Input />
    </>
  )
}
