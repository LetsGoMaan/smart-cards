import s from './empty-deck.module.scss'

import { Button, Typography } from '@/components'
import { BackButton } from '@/pages'

type EmptyDeckProps = {
  deckName: string | undefined
  isMyDeck: boolean
}
export const EmptyDeck = ({ deckName, isMyDeck }: EmptyDeckProps) => {
  return (
    <div className={s.emptyDeckWrapper}>
      <BackButton />
      <Typography className={s.namePack} variant={'large'}>
        {deckName}
      </Typography>
      {isMyDeck ? (
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
