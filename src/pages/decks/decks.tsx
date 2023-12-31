import { useMemo, useState } from 'react'

import s from './decks.module.scss'

import { useDebounce } from '@/common'
import { Pagination, Sort } from '@/components'
import { FetchingSpinner, LoadingSpinner, SomethingWrong } from '@/pages'
import { DecksMenu, DecksTable } from '@/pages/decks'
import {
  setCurrentPage,
  setItemsPerPage,
  setOrderBy,
  useAppDispatch,
  useAppSelector,
  useAuthMeQuery,
  useGetDecksQuery,
} from '@/services'

export const Decks = () => {
  const dispatch = useAppDispatch()
  const { searchByName, authorId, minCardsCount, maxCardsCount, currentPage, itemsPerPage } =
    useAppSelector(state => state.decks)
  const debouncedSearchValue = useDebounce(searchByName, 500)
  const [sort, setSort] = useState<Sort>({ key: 'updated', direction: 'desc' })

  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { data: authData } = useAuthMeQuery()
  const {
    isLoading,
    isFetching,
    error,
    currentData: data,
    //data,
  } = useGetDecksQuery({
    name: debouncedSearchValue,
    orderBy: sortedString,
    authorId,
    minCardsCount,
    maxCardsCount,
    currentPage,
    itemsPerPage,
  })

  const onSetCurrentPage = (page: number) => {
    dispatch(setCurrentPage(page))
  }
  const onSetItemsPerPage = (count: number) => {
    dispatch(setItemsPerPage(count))
  }
  const onSetSort = (sort: Sort) => {
    setSort(sort)
    dispatch(setOrderBy(`${sort?.key}-${sort?.direction}`))
  }
  const totalPages = data?.pagination.totalPages || 1
  const myId = authData?.id // already change!!!

  if (isLoading) return <LoadingSpinner />
  if (error) return <SomethingWrong />

  return (
    <div className={s.generalBlock}>
      <FetchingSpinner loading={isFetching} isMain={true} />
      <DecksMenu />
      <DecksTable decks={data?.items} sort={sort} setSort={onSetSort} authDeckAuthorId={myId} />
      <Pagination
        className={s.pagination}
        count={totalPages}
        page={currentPage}
        onChange={onSetCurrentPage}
        perPage={itemsPerPage}
        onPerPageChange={onSetItemsPerPage}
        perPageOptions={[10, 20, 30, 50]}
      />
    </div>
  )
}
