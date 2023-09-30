import { useState } from 'react'

import s from './decks-menu.module.scss'

import { deleteOutline } from '@/assets'
import { Button, Input, Slider, TabSwitcher, Typography } from '@/components'
import { DeckModalAdd } from '@/pages'
import { decksSlice, useAppDispatch, useAppSelector, useAuthMeQuery } from '@/services'

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
  const authorId = authData?.id || '' //from response

  const setSearchByName = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const setCardsByAuthor = (tabValue: string) => {
    if (tabValue === 'myCards') {
      dispatch(decksSlice.actions.setCardsByAuthor({ authorId, tabValue: 'myCards' }))
    } else {
      dispatch(decksSlice.actions.setCardsByAuthor({ authorId: '', tabValue: 'allCards' }))
    }
  }
  const setMinMaxValue = (value: number[]) => {
    dispatch(decksSlice.actions.setMinMaxCardsCount(value))
  }

  const setDefaultValues = () => {
    dispatch(decksSlice.actions.setDefaultValues())
    dispatch(decksSlice.actions.setCardsByAuthor({ authorId: '', tabValue: 'allCards' }))
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
          onClearClick={() => setSearchByName('')}
          value={searchByName}
          type={'search'}
          placeholder={'Input search'}
          onChangeValue={value => setSearchByName(value)}
        />
        <TabSwitcher
          value={tabValue}
          onValueChange={setCardsByAuthor}
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
      <DeckModalAdd isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  )
}
