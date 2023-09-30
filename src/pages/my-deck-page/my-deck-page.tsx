import { useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { z } from 'zod'

import s from './my-deck-page.module.scss'

import { buttonForDrop, deleteOutline, editButton, playIcon } from '@/assets'
import { useDebounce } from '@/common'
import {
  Button,
  ControlledInput,
  DropDownItem,
  DropDownMenu,
  Input,
  Modal,
  Pagination,
  Sort,
  Typography,
} from '@/components'
import { BackButton, EmptyDeck, MyDeckTable } from '@/pages'
import {
  decksSlice,
  useAppDispatch,
  useAppSelector,
  useCreateCardMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsByIdQuery,
} from '@/services'

type CardFormSchema = z.infer<typeof cardSchema>
const cardSchema = z.object({
  question: z.string().nonempty().min(3).max(30),
  answer: z.string().nonempty().min(3).max(30),
})

export const MyDeckPage = () => {
  const { myCardsPage } = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 500)
  const [sort, setSort] = useState<Sort>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  //const [currentPage, setCurrentPage] = useState(1)
  //const [itemsPerPage, setItemsPerPage] = useState(10)
  const sortedString = useMemo(() => {
    if (!sort) return null

    return `${sort.key}-${sort.direction}`
  }, [sort])
  const { id } = useParams()
  const [createCard] = useCreateCardMutation()
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

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CardFormSchema>({ resolver: zodResolver(cardSchema) })

  const onSubmit: SubmitHandler<CardFormSchema> = data => {
    createCard({ id, answer: data.answer, question: data.question })
    reset()
    setIsModalOpen(false)
  }
  const count = data?.pagination.totalPages || 0
  const setCurrentPage = (page: number) => {
    dispatch(decksSlice.actions.setCurrentPageMyDeck(page.toString()))
  }
  const setItemsPerPage = (itemPerPage: number) => {
    dispatch(decksSlice.actions.setItemsPerPageMyDeck(itemPerPage.toString()))
  }

  if (cardsArray?.length === 0) return <EmptyDeck deckName={deckData?.name} isMyDeck={true} />
  if (isLoading || gettingCardsLoading) return <div>loading...</div>

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
        <Button onClick={() => setIsModalOpen(true)}>
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

      <MyDeckTable cards={data?.items} sort={sort} setSort={setSort} />
      <Pagination
        className={s.pagination}
        count={count}
        page={+myCardsPage.currentPage}
        onChange={page => setCurrentPage(page)}
        perPage={+myCardsPage.itemsPerPage}
        onPerPageChange={itemPerPage => setItemsPerPage(itemPerPage)}
        perPageOptions={[10, 20, 30, 50]}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        showCloseButton={true}
        title={'Add New Card'}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <ControlledInput
              name={'question'}
              control={control}
              label={'Question'}
              errorMessage={errors.question?.message}
            />
            <ControlledInput
              name={'answer'}
              control={control}
              label={'Answer'}
              errorMessage={errors.answer?.message}
            />
          </div>
          <div>
            <Button type={'button'} onClick={() => setIsModalOpen(false)} variant={'secondary'}>
              <Typography as={'h4'} variant={'subtitle2'}>
                Cancel
              </Typography>
            </Button>
            <Button type={'submit'}>
              <Typography as={'h4'} variant={'subtitle2'}>
                Add New Card
              </Typography>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
