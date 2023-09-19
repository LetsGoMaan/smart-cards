import s from './empty-deck.module.scss'

import { Button, Typography } from '@/components'
import { BackButton } from '@/pages'

export const EmptyDeck = () => {
  return (
    <div className={s.emptyDeckWrapper}>
      {/*<button className={s.backToPackListButton}>*/}
      {/*  <img src={arrowBack} className={s.arrowLeftIcon} />*/}
      {/*  <Typography variant={'body2'} as={'p'}>*/}
      {/*    Back to Packs List*/}
      {/*  </Typography>*/}
      {/*</button>*/}
      <BackButton />
      <Typography className={s.namePack} variant={'large'}>
        Name Pack
      </Typography>
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
    </div>
  )
}
