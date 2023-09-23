import { useMemo, useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './my-deck-page.module.scss'

import { buttonForDrop, deleteOutline, editButton, playIcon } from '@/assets'
import { Button, DropDownItem, DropDownMenu, Input, Sort, Typography } from '@/components'
import { BackButton, EmptyDeck, MyDeckTable } from '@/pages'
import { useGetDeckByIdQuery, useGetDeckCardsByIdQuery } from '@/services'

export const MyDeckPage = () => {
  const [sort, setSort] = useState<Sort>(null)
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { id } = useParams()
  const { data, isLoading: gettingCardsLoading } = useGetDeckCardsByIdQuery({
    id,
    orderBy: sortedString,
  })
  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id })

  if (data?.items.length === 0) return <EmptyDeck deckName={deckData?.name} isMyDeck={true} />
  if (isLoading || gettingCardsLoading) return <div>loading...</div>

  return (
    <div className={s.myDeckWrapper}>
      <BackButton />
      <div className={s.titleAndButton}>
        <div className={s.titleAndDrop}>
          <Typography className={s.namePack} variant={'large'}>
            My Pack
          </Typography>
          <DropDownMenu
            align={'end'}
            trigger={
              <span className={s.dropButton}>
                <img src={buttonForDrop} alt={'dropButton'} />
              </span>
            }
          >
            <DropDownItem>
              <img src={playIcon} alt={'learn'} />
              <Typography variant={'caption'}>Learn</Typography>
            </DropDownItem>
            <DropDownItem>
              <img src={editButton} alt={'edit'} />
              <Typography variant={'caption'}>Edit</Typography>
            </DropDownItem>
            <DropDownItem>
              <img src={deleteOutline} alt={'delete'} />
              <Typography variant={'caption'}>Delete</Typography>
            </DropDownItem>
          </DropDownMenu>
        </div>
        <Button>
          <Typography variant={'subtitle2'} as={'h4'}>
            Add New Card
          </Typography>
        </Button>
      </div>
      <Input type={'search'} className={s.searchInput} />

      <MyDeckTable cards={data?.items} sort={sort} setSort={setSort} />
    </div>
  )
}
