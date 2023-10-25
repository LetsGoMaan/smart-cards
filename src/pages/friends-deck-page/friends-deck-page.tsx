import { useMemo, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import s from './friends-deck-page.module.scss'

import { useDebounce } from '@/common'
import {
  Button,
  Column,
  Input,
  Pagination,
  ReadMore,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import {
  BackButton,
  EmptyDeck,
  FetchingSpinner,
  Grade,
  LoadingSpinner,
  SomethingWrong,
} from '@/pages'
import { useGetDeckByIdQuery, useGetDeckCardsByIdQuery } from '@/services'

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

  const {
    data,
    isLoading: isGettingCardsLoading,
    error,
    isFetching,
  } = useGetDeckCardsByIdQuery({
    id,
    orderBy: sortedString,
    question: debouncedSearchValue,
    currentPage,
    itemsPerPage,
  })
  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id })
  const totalPages = data?.pagination.totalPages || 1

  if (deckData?.cardsCount === 0) {
    return <EmptyDeck deckName={deckData?.name || 'Pack'} isMyDeck={false} />
  }
  if (error) return <SomethingWrong />
  if (isLoading || isGettingCardsLoading) return <LoadingSpinner />

  return (
    <div className={s.deckWrapper}>
      <FetchingSpinner loading={isFetching} />
      <BackButton />
      <div className={s.titleAndButton}>
        <Typography variant={'large'}>{deckData?.name || 'Pack'}</Typography>
        <Button className={s.learnPackButton} as={Link} to={`/card/${id}`}>
          <Typography variant={'subtitle2'} as={'h4'}>
            Learn to Pack
          </Typography>
        </Button>
      </div>
      {deckData?.cover && <img className={s.packImage} src={deckData.cover} alt="pack image" />}
      <Input
        value={searchValue}
        onChangeValue={value => setSearchValue(value)}
        type={'search'}
        className={s.searchInput}
        onClearClick={() => setSearchValue('')}
      />
      <Table>
        <TableHeader style={{ cursor: 'pointer' }} columns={columns} sort={sort} onSort={setSort} />
        <TableBody>
          {data?.items.map(card => {
            return (
              <TableRow key={card.id}>
                <TableData style={{ width: '30%' }}>
                  <span className={s.dataWithImage}>
                    {card.questionImg && (
                      <img className={s.cardImage} src={card.questionImg} alt={'question image'} />
                    )}
                    <Typography className={s.text} as={'span'} variant={'body2'}>
                      <ReadMore text={card.question} />
                    </Typography>
                  </span>
                </TableData>
                <TableData style={{ width: '30%' }}>
                  <span className={s.dataWithImage}>
                    {card.answerImg && (
                      <img className={s.cardImage} src={card.answerImg} alt={'answer image'} />
                    )}
                    <Typography className={s.text} as={'span'} variant={'body2'}>
                      <ReadMore text={card.answer} />
                    </Typography>
                  </span>
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
