import s from './decksMenu.module.scss'

import { deleteOutline } from '@/assets'
import { Button, Input, TabSwitcher, Typography } from '@/components'
import { Slider } from '@/components/ui/slider'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

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
  const setSearchByName = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))
  const setCardsByAuthor = (tabValue: string) => {
    if (tabValue === 'myCards') {
      dispatch(decksSlice.actions.setCardsByAuthor('f2be95b9-4d07-4751-a775-bd612fc9553a'))
    } else {
      dispatch(decksSlice.actions.setCardsByAuthor(''))
    }
  }
  const setMinMaxValue = (value: number[]) => {
    dispatch(decksSlice.actions.setMinMaxCardsCount(value))
  }

  const setDefaultValues = () => {
    dispatch(decksSlice.actions.setDefaultValues())
    //setText('')
  }

  const onClearClickHandler = () => {
    dispatch(decksSlice.actions.setClearSearch())
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
          onClearClick={onClearClickHandler}
          value={searchByName}
          type={'search'}
          placeholder={'Input search'}
          onChange={e => setSearchByName(e.currentTarget.value)}
        />
        <TabSwitcher onValueChange={setCardsByAuthor} label={'Show packs cards'} tabs={tabs} />
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
