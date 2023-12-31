import s from './empty-deck.module.scss'

import { Button, Typography } from '@/components'
import { BackButton, CardsModal } from '@/pages'

type EmptyDeckProps = {
  deckName: string | undefined
  isMyDeck: boolean
  isLearn?: boolean
  isModalOpen?: boolean
  setIsModalOpen?: (open: boolean) => void
  id?: string
}
export const EmptyDeck = ({
  deckName,
  isMyDeck,
  isLearn,
  setIsModalOpen,
  isModalOpen,
  id,
}: EmptyDeckProps) => {
  const onModalOpen = () => {
    setIsModalOpen && setIsModalOpen(true)
  }
  const onSetOpen = (isOpen: boolean) => {
    setIsModalOpen && setIsModalOpen(isOpen)
  }
  const isOpen = isModalOpen || false

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
          <Button onClick={onModalOpen}>
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
          {isLearn && (
            <Typography className={s.textWarning} as={'p'} variant={'body1'}>
              There is nothing to learn
            </Typography>
          )}
        </div>
      )}
      <CardsModal
        title={'Add New Card'}
        buttonTitle={'Add New Card'}
        setIsModalOpen={open => onSetOpen(open)}
        isModalOpen={isOpen}
        id={id}
      />
    </div>
  )
}
