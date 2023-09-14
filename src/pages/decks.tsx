import { Link } from 'react-router-dom'

import { useCreateDeckMutation, useGetDecksQuery } from '@/services/decks.ts'

export const Decks = () => {
  const decks = useGetDecksQuery()
  const [createDeck, {}] = useCreateDeckMutation()

  if (decks.isLoading) return <div>Loading...</div>
  if (decks.isError) return <div>Error</div>

  return (
    <div>
      <Link to={'/2'}>go</Link>
      <button
        onClick={() => {
          createDeck({ name: '123' })
        }}
      />
    </div>
  )
}
