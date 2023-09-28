import s from './my-deck-page.module.scss'

import { deleteOutline, editButton, starFullIcon, starIcon } from '@/assets'
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
import { Grade } from '@/pages'
import { Card } from '@/services'

type MyDeckTableProps = {
  cards: Card[] | undefined
  sort: Sort
  setSort: (sort: Sort) => void
}
export const MyDeckTable = ({ cards, sort, setSort }: MyDeckTableProps) => {
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
    {
      key: 'actions',
      title: '',
    },
  ]

  return (
    <Table>
      <TableHeader columns={columns} sort={sort} onSort={setSort} />
      <TableBody>
        {cards?.map(card => {
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
                  {/*<div style={{ display: 'flex', gap: '10px' }}>
                    <img src={card.grade >= 1 ? starFullIcon : starIcon} alt={'star'} />
                    <img src={card.grade >= 2 ? starFullIcon : starIcon} alt={'star'} />
                    <img src={card.grade >= 3 ? starFullIcon : starIcon} alt={'star'} />
                    <img src={card.grade >= 4 ? starFullIcon : starIcon} alt={'star'} />
                    <img src={card.grade >= 5 ? starFullIcon : starIcon} alt={'star'} />
                  </div>*/}
                  <Grade grade={card.grade} />
                </Typography>
              </TableData>
              <TableData>
                <div className={s.editButtons}>
                  <button>
                    <img src={editButton} alt={'edit'} />
                  </button>
                  <button>
                    <img src={deleteOutline} alt={'delete'} />
                  </button>
                </div>
              </TableData>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
