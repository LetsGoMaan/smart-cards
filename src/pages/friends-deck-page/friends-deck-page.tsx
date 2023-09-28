import { useMemo, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './friends-deck-page.module.scss'

import { useDebounce } from '@/common'
import {
  Button,
  Column,
  Input,
  Pagination,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import { BackButton, EmptyDeck, Grade } from '@/pages'
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

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const { data, isLoading: gettingCardsLoading } = useGetDeckCardsByIdQuery({
    id,
    orderBy: sortedString,
    question: debouncedSearchValue,
    currentPage,
    itemsPerPage,
  })
  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id })
  const totalPages = data?.pagination.totalPages || 1
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
        <Button className={s.learnPackButton} as={Link} to={`/card/${id}`}>
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
                  <Grade grade={card.grade} />
                </TableData>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Pagination
        className={s.pagination}
        count={totalPages}
        page={currentPage}
        onChange={setCurrentPage}
        perPage={itemsPerPage}
        onPerPageChange={setItemsPerPage}
        perPageOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}
