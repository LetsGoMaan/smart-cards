import { useState } from 'react'

import s from './decks-menu.module.scss'

import { deleteOutline } from '@/assets'
import { Button, Input, Slider, TabSwitcher, Typography } from '@/components'
import { DeckModal } from '@/pages'
import {
  setCardsByAuthor,
  setCurrentPage,
  setMinMaxCardsCount,
  setSearchByName,
  useAppDispatch,
  useAppSelector,
  useAuthMeQuery,
} from '@/services'

export const DecksMenu = () => {
  const dispatch = useAppDispatch()
  const { searchByName, minCardsCount, maxCardsCount, tabValue } = useAppSelector(
    state => state.decks
  )
  const [isModalOpen, setModalOpen] = useState(false)
  const { data: authData } = useAuthMeQuery()

  const tabs = [
    {
      value: 'myCards',
      title: 'My Cards',
    },
    {
      value: 'allCards',
      title: 'All Cards',
    },
  ]
  const authorId = authData?.id || ''

  const onSetSearchByName = (search: string) => dispatch(setSearchByName(search))

  const onSetCardsByAuthor = (tabValue: string) => {
    if (tabValue === 'myCards') {
      dispatch(setCurrentPage(1))
      dispatch(setCardsByAuthor({ authorId, tabValue: 'myCards' }))
    } else {
      dispatch(setCardsByAuthor({ authorId: '', tabValue: 'allCards' }))
    }
  }
  const setMinMaxValue = (value: number[]) => {
    dispatch(setCurrentPage(1))
    dispatch(setMinMaxCardsCount(value))
  }

  const setDefaultValues = () => {
    dispatch(setSearchByName(''))
    dispatch(setMinMaxCardsCount([0, 100]))
    dispatch(setCardsByAuthor({ authorId: '', tabValue: 'allCards' }))
  }

  return (
    <div className={s.menuWrapper}>
      <div className={s.titleAndButton}>
        <Typography as={'p'} variant={'large'} className={s.title}>
          Packs list
        </Typography>
        <Button onClick={() => setModalOpen(true)}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Add New Pack
          </Typography>
        </Button>
      </div>
      <div className={s.menuItems}>
        <Input
          onClearClick={() => onSetSearchByName('')}
          value={searchByName}
          type={'search'}
          placeholder={'Input search'}
          onChangeValue={value => onSetSearchByName(value)}
        />
        <TabSwitcher
          value={tabValue}
          onValueChange={onSetCardsByAuthor}
          label={'Show packs cards'}
          tabs={tabs}
        />
        <Slider
          min={0}
          max={100}
          onChange={setMinMaxValue}
          label={'Number of cards'}
          value={[+minCardsCount, +maxCardsCount]}
        />
        <Button onClick={setDefaultValues} variant={'secondary'}>
          <img src={deleteOutline} alt={'clear'} />
          <Typography as={'h4'} variant={'subtitle2'}>
            Clear filter
          </Typography>
        </Button>
      </div>
      <DeckModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        modalTitle={'Add New Pack'}
        buttonTitle={'Add New Pack'}
      />
    </div>
  )
}
