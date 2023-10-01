import { useMemo, useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './my-deck-page.module.scss'

import { buttonForDrop, deleteOutline, editButton, playIcon } from '@/assets'
import { useDebounce } from '@/common'
import {
  Button,
  DropDownItem,
  DropDownMenu,
  Input,
  Pagination,
  Sort,
  Typography,
} from '@/components'
import { BackButton, CardsModal, EmptyDeck, MyDeckTable } from '@/pages'
import {
  decksSlice,
  useAppDispatch,
  useAppSelector,
  useGetDeckByIdQuery,
  useGetDeckCardsByIdQuery,
} from '@/services'

export const MyDeckPage = () => {
  const { myCardsPage } = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const [sort, setSort] = useState<Sort>(null)
  const [isModalAddOpen, setIsModalAddOpen] = useState(false)

  //const [currentPage, setCurrentPage] = useState(1)
  //const [itemsPerPage, setItemsPerPage] = useState(10)
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { id } = useParams()

  const { data, isLoading: gettingCardsLoading } = useGetDeckCardsByIdQuery({
    id,
    orderBy: sortedString,
    question: debouncedSearchValue,
    currentPage: +myCardsPage.currentPage,
    itemsPerPage: +myCardsPage.itemsPerPage,
  })

  const { data: deckData, isLoading } = useGetDeckByIdQuery({ id })
  const cardsArray = useMemo(() => {
    return data?.items
  }, [])

  const count = data?.pagination.totalPages || 0
  const setCurrentPage = (page: number) => {
    dispatch(decksSlice.actions.setCurrentPageMyDeck(page.toString()))
  }
  const setItemsPerPage = (itemPerPage: number) => {
    dispatch(decksSlice.actions.setItemsPerPageMyDeck(itemPerPage.toString()))
  }

  if (isLoading || gettingCardsLoading) return <div>loading...</div>
  if (cardsArray?.length === 0)
    return (
      <EmptyDeck
        deckName={deckData?.name}
        isMyDeck={true}
        isModalOpen={isModalAddOpen}
        setIsModalOpen={setIsModalAddOpen}
        id={id}
      />
    )

  return (
    <div className={s.myDeckWrapper}>
      <BackButton />
      <div className={s.titleAndButton}>
        <div className={s.titleAndDrop}>
          <Typography className={s.namePack} variant={'large'}>
            {deckData?.name}
          </Typography>
          <DropDownMenu
            align={'end'}
            trigger={
              <span className={s.dropButton}>
                <img src={buttonForDrop} alt={'dropButton'} />
              </span>
            }
          >
            <DropDownItem>
              <img src={playIcon} alt={'learn'} />
              <Typography variant={'caption'}>Learn</Typography>
            </DropDownItem>
            <DropDownItem>
              <img src={editButton} alt={'edit'} />
              <Typography variant={'caption'}>Edit</Typography>
            </DropDownItem>
            <DropDownItem>
              <img src={deleteOutline} alt={'delete'} />
              <Typography variant={'caption'}>Delete</Typography>
            </DropDownItem>
          </DropDownMenu>
        </div>
        <Button onClick={() => setIsModalAddOpen(true)}>
          <Typography variant={'subtitle2'} as={'h4'}>
            Add New Card
          </Typography>
        </Button>
      </div>
      <Input
        value={searchValue}
        onChangeValue={value => setSearchValue(value)}
        type={'search'}
        className={s.searchInput}
        onClearClick={() => setSearchValue('')}
      />

      <MyDeckTable cards={data?.items} sort={sort} setSort={setSort} id={id} />
      <Pagination
        className={s.pagination}
        count={count}
        page={+myCardsPage.currentPage}
        onChange={page => setCurrentPage(page)}
        perPage={+myCardsPage.itemsPerPage}
        onPerPageChange={itemPerPage => setItemsPerPage(itemPerPage)}
        perPageOptions={[10, 20, 30, 50]}
      />
      <CardsModal
        title={'Add New Card'}
        setIsModalOpen={setIsModalAddOpen}
        isModalOpen={isModalAddOpen}
        id={id}
      />
    </div>
  )
}
