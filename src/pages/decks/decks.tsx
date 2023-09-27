import { useMemo, useState } from 'react'

import s from './decks.module.scss'

import { useDebounce } from '@/common'
import { Pagination, Sort } from '@/components'
import { DecksMenu, DecksTable } from '@/pages/decks'
import { useGetDecksQuery, useAppSelector, useAuthMeQuery } from '@/services'

export const Decks = () => {
  const { searchByName, authorId, minCardsCount, maxCardsCount } = useAppSelector(
    state => state.decks
  )
  const debouncedSearchValue = useDebounce(searchByName, 500)
  const [sort, setSort] = useState<Sort>(null)
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { data: authData } = useAuthMeQuery()
  const { isLoading, data } = useGetDecksQuery({
    name: debouncedSearchValue,
    orderBy: sortedString,
    authorId,
    minCardsCount,
    maxCardsCount,
    currentPage,
    itemsPerPage: perPage,
  })

  const totalPages = data?.pagination.totalPages || 1
  const myId = authData?.id // already change!!!

  if (isLoading) return <div>loading</div>

  return (
    <div className={s.generalBlock}>
      <DecksMenu />
      <DecksTable decks={data?.items} sort={sort} setSort={setSort} authDeckAuthorId={myId} />
      <Pagination
        className={s.pagination}
        count={totalPages}
        page={currentPage}
        onChange={setCurrentPage}
        perPage={perPage}
        onPerPageChange={setPerPage}
        perPageOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}
