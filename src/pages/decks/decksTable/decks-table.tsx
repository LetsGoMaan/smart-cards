import { Link } from 'react-router-dom'

import s from './decks-table.module.scss'

import { deleteOutline, editButton, playIcon } from '@/assets'
import {
  Column,
  Sort,
  Table,
  TableBody,
  TableData,
  TableHeader,
  TableRow,
  Typography,
} from '@/components'
import { Deck } from '@/services/decks/types.ts'

type DecksTableProps = {
  decks: Deck[] | undefined
  sort: Sort
  setSort: (sort: Sort) => void
  deckAuthorId: string
}
export const DecksTable = ({ decks, sort, setSort, deckAuthorId }: DecksTableProps) => {
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

  return (
    <Table>
      <TableHeader columns={columns} sort={sort} onSort={setSort} />
      <TableBody>
        {decks?.map(deck => {
          const packPath =
            deck.author.id !== deckAuthorId ? `/friends-pack/${deck.id}` : `/my-pack/${deck.id}`

          return (
            <TableRow key={deck.id}>
              <TableData style={{ width: '21%' }}>
                <Typography className={s.deckLink} to={packPath} as={Link} variant={'body2'}>
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
  )
}
