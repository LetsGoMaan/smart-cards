import s from './empty-deck.module.scss'

import { Button, Typography } from '@/components'
import { BackButton } from '@/pages'

export const EmptyDeck = () => {
  const myDeck = true //need to change

  return (
    <div className={s.emptyDeckWrapper}>
      <BackButton />
      <Typography className={s.namePack} variant={'large'}>
        Name Pack //need to change
      </Typography>
      {myDeck ? (
        <div className={s.textWrapper}>
          <Typography className={s.textWarning} variant={'body1'} as={'p'}>
            This pack is empty. Click add new card to fill this pack
          </Typography>
          <Button>
            <Typography variant={'subtitle2'} as={'h4'}>
              Add New Card
            </Typography>
          </Button>
        </div>
      ) : (
        <div className={s.textWrapper}>
          <Typography className={s.textWarning} variant={'body1'} as={'p'}>
            This pack is empty.
          </Typography>
        </div>
      )}
    </div>
  )
}
