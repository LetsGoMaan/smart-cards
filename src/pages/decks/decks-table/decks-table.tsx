import { useState } from 'react'

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
import { DeckModal, DeleteItemModal } from '@/pages'
import { Deck, setEditDeckName, useAppDispatch } from '@/services'

type DecksTableProps = {
  decks?: Deck[]
  sort: Sort
  setSort: (sort: Sort) => void
  authDeckAuthorId?: string
}
export const DecksTable = ({ decks, sort, setSort, authDeckAuthorId }: DecksTableProps) => {
  const dispatch = useAppDispatch()
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [id, setId] = useState('')
  const [deckName, setDeckName] = useState('')
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
  const editHandler = (id: string, name: string) => {
    setModalOpen(true)
    setId(id)
    setDeckName(name)
    dispatch(setEditDeckName(name))
  }
  const deleteHandler = (id: string, name: string) => {
    setDeleteModalOpen(true)
    setId(id)
    setDeckName(name)
  }

  return (
    <>
      <Table>
        <TableHeader columns={columns} sort={sort} onSort={setSort} />
        <TableBody>
          {decks?.map(deck => {
            const packPath =
              deck.author.id !== authDeckAuthorId
                ? `/friends-pack/${deck.id}`
                : `/my-pack/${deck.id}`

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
                    {/*<button onClick={() => setDeckId(deck.id)}>*/}
                    {/*<button onClick={() => getRandomCard({ id: deck.id })}>*/}
                    <Link to={`/card/${deck.id}`}>
                      <img src={playIcon} alt={'play'} />
                    </Link>

                    {/*</button>*/}
                    {deck.author.id === authDeckAuthorId && (
                      <>
                        <button onClick={() => editHandler(deck.id, deck.name)}>
                          <img src={editButton} alt={'edit'} />
                        </button>
                        <button onClick={() => deleteHandler(deck.id, deck.name)}>
                          <img src={deleteOutline} alt={'delete'} />
                        </button>
                      </>
                    )}
                  </div>
                </TableData>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <DeckModal
        id={id}
        deckName={deckName}
        modalTitle={'Edit Pack'}
        buttonTitle={'Save Changes'}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
      <DeleteItemModal
        id={id}
        deckName={deckName}
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setDeleteModalOpen}
        title={'Delete Pack'}
      />
    </>
  )
}
