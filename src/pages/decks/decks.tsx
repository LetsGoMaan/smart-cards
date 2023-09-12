//import { useState } from 'react'

import { Button, Input } from '@/components'
import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store'

export const Decks = () => {
  //const [itemsPerPage, setItemsPerPage] = useState(10)
  const dispatch = useAppDispatch()
  const { itemsPerPage, currentPage, searchByName, cardName } = useAppSelector(state => state.decks)
  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))
  const setCurrentPage = (currentPage: number) =>
    dispatch(decksSlice.actions.setCurrentPage(currentPage))
  const setSearchByName = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))
  const { isLoading, data } = useGetDecksQuery(
    { itemsPerPage, currentPage, name: searchByName, orderBy: 'created-desc' },
    { skip: false }
  )
  const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDeckMutation()
  const setCardName = (cardName: string) => dispatch(decksSlice.actions.setCardName(cardName))
  const createDeckHandler = () => createDeck({ name: cardName })

  if (isLoading) return <div>loading</div>

  return (
    <div>
      isLoading - {new String(isLoading)}
      <div>
        <Button onClick={() => setItemsPerPage(10)}>itemsPerPage: 10</Button>
        <Button onClick={() => setItemsPerPage(20)}>itemsPerPage: 20</Button>
        <Button onClick={() => setItemsPerPage(30)}>itemsPerPage: 30</Button>
      </div>
      <div>
        <Button onClick={() => setCurrentPage(1)}>currentPage: 1</Button>
        <Button onClick={() => setCurrentPage(2)}>currentPage: 2</Button>
        <Button onClick={() => setCurrentPage(3)}>currentPage: 3</Button>
      </div>
      <Input value={searchByName} onChange={e => setSearchByName(e.currentTarget.value)} />
      <div>
        <Input
          value={cardName}
          onChange={e => setCardName(e.currentTarget.value)}
          label={'new card name'}
        />
        <Button onClick={createDeckHandler}>Add new deck</Button>
        isCreateDeckLoading - {new String(isCreateDeckLoading)}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Cards</th>
            <th>Last updated</th>
            <th>Created by</th>
          </tr>
        </thead>
        <tbody>
          {data?.items.map(deck => {
            return (
              <tr key={deck.id}>
                <td>{deck.name}</td>
                <td>{deck.cardsCount}</td>
                <td>{new Date(deck.updated).toLocaleDateString('en-GB')}</td>
                <td>{deck.author.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
