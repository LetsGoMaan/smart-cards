//import { useState } from 'react'
import s from './decks.module.scss'

import { deleteOutline, editButton, playIcon } from '@/assets'
import { Table, TableBody, TableData, TableHead, TableHeaderData, TableRow } from '@/components'
import { DecksMenu } from '@/pages/decks/decksMenu/decksMenu.tsx'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store'

export const Decks = () => {
  //const [itemsPerPage, setItemsPerPage] = useState(10)
  const dispatch = useAppDispatch()
  const {
    itemsPerPage,
    currentPage,
    searchByName,
    cardName,
    authorId,
    minCardsCount,
    maxCardsCount,
  } = useAppSelector(state => state.decks)
  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearchByName = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))
  const { isLoading, data } = useGetDecksQuery(
    {
      itemsPerPage,
      currentPage,
      name: searchByName,
      orderBy: 'created-desc',
      authorId,
      minCardsCount,
      maxCardsCount,
    },
    { skip: false }
  )
  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()
  const setCardName = (cardName: string) => dispatch(decksSlice.actions.setCardName(cardName))
  const createDeckHandler = () => createDeck({ name: cardName })

  if (isLoading) return <div>loading</div>

  return (
    <div className={s.generalBlock}>
      {/*isLoading - {new String(isLoading)}*/}
      {/*<div>*/}
      {/*  <Button onClick={() => setItemsPerPage(10)}>itemsPerPage: 10</Button>*/}
      {/*  <Button onClick={() => setItemsPerPage(20)}>itemsPerPage: 20</Button>*/}
      {/*  <Button onClick={() => setItemsPerPage(30)}>itemsPerPage: 30</Button>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <Button onClick={() => setCurrentPage(1)}>currentPage: 1</Button>*/}
      {/*  <Button onClick={() => setCurrentPage(2)}>currentPage: 2</Button>*/}
      {/*  <Button onClick={() => setCurrentPage(3)}>currentPage: 3</Button>*/}
      {/*</div>*/}
      {/*<Input value={searchByName} onChange={e => setSearchByName(e.currentTarget.value)} />*/}
      {/*<div>*/}
      {/*  <Input*/}
      {/*    value={cardName}*/}
      {/*    onChange={e => setCardName(e.currentTarget.value)}*/}
      {/*    label={'new card name'}*/}
      {/*  />*/}
      {/*  <Button onClick={createDeckHandler}>Add new deck</Button>*/}
      {/*  isCreateDeckLoading - {new String(isCreateDeckLoading)}*/}
      {/*</div>*/}
      <DecksMenu />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderData>Name</TableHeaderData>
            <TableHeaderData>Cards</TableHeaderData>
            <TableHeaderData>Last updated</TableHeaderData>
            <TableHeaderData>Created by</TableHeaderData>
            <TableHeaderData></TableHeaderData>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.items.map(deck => {
            return (
              <TableRow key={deck.id}>
                <TableData>{deck.name}</TableData>
                <TableData>{deck.cardsCount}</TableData>
                <TableData>{new Date(deck.updated).toLocaleDateString('en-GB')}</TableData>
                <TableData>{deck.author.name}</TableData>
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
