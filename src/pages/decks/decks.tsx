import { useState } from 'react'

import s from './decks.module.scss'

import { deleteOutline, editButton, playIcon } from '@/assets'
import { useDebounce } from '@/common'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeaderData,
  TableRow,
  Typography,
} from '@/components'
import { DecksMenu } from '@/pages/decks/decksMenu'
import { decksSlice, useGetDecksQuery, useAppDispatch, useAppSelector } from '@/services'

export const Decks = () => {
  const dispatch = useAppDispatch()
  const { searchByName, authorId, minCardsCount, maxCardsCount, orderBy } = useAppSelector(
    state => state.decks
  )
  const debouncedSearchValue = useDebounce(searchByName, 500)
  const { isLoading, data } = useGetDecksQuery(
    {
      name: debouncedSearchValue,
      orderBy,
      authorId,
      minCardsCount,
      maxCardsCount,
    },
    { skip: false }
  )

  const columns: Column[] = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'cardsCount',
      title: 'Cards',
    },
    {
      key: 'updated',
      title: 'Last Updated',
    },
    {
      key: 'createdBy',
      title: 'Created by',
    },
    {
      key: 'icons',
      title: '',
    },
  ]
  const [sort, setSort] = useState<Sort>(null)

  const handleSort = (key: string) => {
    if (sort && sort.key === key && sort.direction === 'desc') {
      setSort(null)
      dispatch(decksSlice.actions.setOrderBy('updated-desc'))

      return
    }
    if (sort && sort.key === key && sort.direction === 'asc') {
      setSort({
        key,
        direction: 'desc',
      })
      dispatch(decksSlice.actions.setOrderBy(`${key}-desc`))
    } else {
      setSort({
        key,
        direction: 'asc',
      })
      dispatch(decksSlice.actions.setOrderBy(`${key}-asc`))
    }
  }

  if (isLoading) return <div>loading</div>

  return (
    <div className={s.generalBlock}>
      <DecksMenu />
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableHeaderData onClick={() => handleSort(column.key)} key={column.key}>
                <Typography as={'h3'} variant={'subtitle2'}>
                  {column.title}
                  {sort && sort.key === column.key && (
                    <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </Typography>
              </TableHeaderData>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items.map(deck => {
            return (
              <TableRow key={deck.id}>
                <TableData style={{ width: '21%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {deck.name}
                  </Typography>
                </TableData>
                <TableData style={{ width: '21%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {deck.cardsCount}
                  </Typography>
                </TableData>
                <TableData style={{ width: '21%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {new Date(deck.updated).toLocaleDateString('en-GB')}
                  </Typography>
                </TableData>
                <TableData style={{ width: '28%' }}>
                  <Typography as={'p'} variant={'body2'}>
                    {deck.author.name}
                  </Typography>
                </TableData>
                <TableData>
                  <div className={s.controlButtons}>
                    <img src={playIcon} alt={'play'} />
                    <img src={editButton} alt={'edit'} />
                    <img src={deleteOutline} alt={'delete'} />
                  </div>
                </TableData>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
