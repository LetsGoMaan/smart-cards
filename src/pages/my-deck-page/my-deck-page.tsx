import { useMemo, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

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
import {
  BackButton,
  CardsModal,
  DeckModal,
  DeleteItemModal,
  EmptyDeck,
  FetchingSpinner,
  LoadingSpinner,
  MyDeckTable,
  SomethingWrong,
} from '@/pages'
import {
  setCurrentPageMyDeck,
  setItemsPerPageMyDeck,
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
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false)
  const [isDeckDeleteModalOpen, setIsDeckDeleteModalOpen] = useState(false)

  //const [currentPage, setCurrentPage] = useState(1)
  //const [itemsPerPage, setItemsPerPage] = useState(10)
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { id } = useParams()

  const {
    data,
    isLoading: isGettingCardsLoading,
    error,
    isFetching,
  } = useGetDeckCardsByIdQuery({
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
    dispatch(setCurrentPageMyDeck(page.toString()))
  }
  const setItemsPerPage = (itemPerPage: number) => {
    dispatch(setItemsPerPageMyDeck(itemPerPage.toString()))
  }
  const deleteId = id || ''

  const deleteHandler = () => {
    setIsDeckDeleteModalOpen(true)
  }

  if (error) return <SomethingWrong />
  if (isLoading || isGettingCardsLoading) return <LoadingSpinner />
  if (cardsArray?.length === 0)
    return (
      <EmptyDeck
        deckName={deckData?.name}
        isMyDeck={true}
        isModalOpen={isCardModalOpen}
        setIsModalOpen={setIsCardModalOpen}
        id={id}
      />
    )

  return (
    <div className={s.myDeckWrapper}>
      <FetchingSpinner loading={isFetching} />
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
              <Typography className={s.dropLink} as={Link} to={`/card/${id}`} variant={'caption'}>
                <img src={playIcon} alt={'learn'} />
                Learn
              </Typography>
            </DropDownItem>
            <DropDownItem>
              <button onClick={() => setIsDeckModalOpen(true)} className={s.dropLink}>
                <img src={editButton} alt={'edit'} />
                <Typography as={'p'} variant={'caption'}>
                  Edit
                </Typography>
              </button>
            </DropDownItem>
            <DropDownItem>
              <button onClick={deleteHandler} className={s.dropLink}>
                <img src={deleteOutline} alt={'delete'} />
                <Typography variant={'caption'}>Delete</Typography>
              </button>
            </DropDownItem>
          </DropDownMenu>
        </div>
        <Button onClick={() => setIsCardModalOpen(true)}>
          <Typography variant={'subtitle2'} as={'h4'}>
            Add New Card
          </Typography>
        </Button>
      </div>
      {deckData?.cover && <img className={s.packImage} src={deckData.cover} alt="pack image" />}
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
        buttonTitle={'Add New Card'}
        setIsModalOpen={setIsCardModalOpen}
        isModalOpen={isCardModalOpen}
        id={id}
      />
      <DeckModal
        isModalOpen={isDeckModalOpen}
        setModalOpen={setIsDeckModalOpen}
        modalTitle={'Edit Pack'}
        buttonTitle={'Save Changes'}
      />
      <DeleteItemModal
        isModalOpen={isDeckDeleteModalOpen}
        setIsModalOpen={setIsDeckDeleteModalOpen}
        id={deleteId}
        title={'Delete Pack'}
        deckName={deckData?.name}
        isNavigate={true}
      />
    </div>
  )
}
