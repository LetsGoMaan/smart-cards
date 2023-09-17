import { useState } from 'react'

import s from './decksMenu.module.scss'

import { deleteOutline } from '@/assets'
import { Button, Input, Slider, TabSwitcher, Typography } from '@/components'
import { decksSlice, useAppDispatch, useAppSelector } from '@/services'

export const DecksMenu = () => {
  const dispatch = useAppDispatch()
  const { searchByName, minCardsCount, maxCardsCount } = useAppSelector(state => state.decks)

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
  const authorId = 'f2be95b9-4d07-4751-a775-bd612fc9553a' //from response
  const [tabValue, setTabValue] = useState(tabs[1].value)

  const setSearchByName = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const setCardsByAuthor = (tabValue: string) => {
    if (tabValue === 'myCards') {
      dispatch(decksSlice.actions.setCardsByAuthor(authorId))
      setTabValue(tabs[0].value)
    } else {
      dispatch(decksSlice.actions.setCardsByAuthor(''))
      setTabValue(tabs[1].value)
    }
  }
  const setMinMaxValue = (value: number[]) => {
    dispatch(decksSlice.actions.setMinMaxCardsCount(value))
  }

  const setDefaultValues = () => {
    dispatch(decksSlice.actions.setDefaultValues())
    setTabValue(tabs[1].value)
  }

  return (
    <div className={s.menuWrapper}>
      <div className={s.titleAndButton}>
        <Typography variant={'large'} className={s.title}>
          Packs list
        </Typography>
        <Button>
          <Typography variant={'subtitle2'}>Add New Pack </Typography>
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
          <Typography variant={'subtitle2'}>Clear filter</Typography>
        </Button>
      </div>
    </div>
  )
}
