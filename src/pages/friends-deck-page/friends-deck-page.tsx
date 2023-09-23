import { useMemo, useState } from 'react'

import { StarIcon } from '@radix-ui/react-icons'
import { useParams } from 'react-router-dom'

import s from './friends-deck-page.module.scss'

import { useDebounce } from '@/common'
import {
  Button,
  Column,
  Input,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import { BackButton, EmptyDeck } from '@/pages'
import { useGetDeckByIdQuery, useGetDeckCardsByIdQuery } from '@/services'

export const FriendsDeckPage = () => {
  const { id } = useParams()
  const [sort, setSort] = useState<Sort>(null)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { data, isLoading: gettingCardsLoading } = useGetDeckCardsByIdQuery({
    id,
    orderBy: sortedString,
    question: debouncedSearchValue,
  })
  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id })

  const columns: Column[] = [
    {
      key: 'question',
      title: 'Question',
    },
    {
      key: 'answer',
      title: 'Answer',
    },
    {
      key: 'updated',
      title: 'Last Updated',
    },
    {
      key: 'grade',
      title: 'Grade',
    },
  ]

  if (data?.items.length === 0) return <EmptyDeck deckName={deckData?.name} isMyDeck={false} />
  if (isLoading || gettingCardsLoading) return <div>loading...</div>

  return (
    <div className={s.deckWrapper}>
      <BackButton />
      <div className={s.titleAndButton}>
        <Typography className={s.namePack} variant={'large'}>
          {deckData?.name}
        </Typography>
        <Button>
          <Typography variant={'subtitle2'} as={'h4'}>
            Learn to Pack
          </Typography>
        </Button>
      </div>
      <Input
        value={searchValue}
        onChangeValue={value => setSearchValue(value)}
        type={'search'}
        className={s.searchInput}
        onClearClick={() => setSearchValue('')}
      />
      <Table>
        <TableHeader columns={columns} sort={sort} onSort={setSort} />
        <TableBody>
          {data?.items.map(card => {
            return (
              <TableRow key={card.id}>
                <TableData style={{ width: '30%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {card.question}
                  </Typography>
                </TableData>
                <TableData style={{ width: '30%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {card.answer}
                  </Typography>
                </TableData>
                <TableData style={{ width: '20%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {new Date(card.updated).toLocaleDateString('en-GB')}
                  </Typography>
                </TableData>
                <TableData style={{ width: '20%' }}>
                  <Typography as={'div'} variant={'body2'}>
                    {card.rating}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </Typography>
                </TableData>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
