//import { FC } from 'react'

//import { clsx } from 'clsx'

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import s from './pagination.module.scss'

//import { ArrowLeft, ArrowRight } from '@/assets'
import { Select } from '@/components'
import { usePagination } from '@/components/ui/pagination/usePagination.tsx'

type PaginationConditionals =
  | {
      perPage?: null
      perPageOptions?: never
      onPerPageChange?: never
    }
  | {
      perPage: number
      perPageOptions: number[]
      onPerPageChange: (itemPerPage: number) => void
    }

export type PaginationProps = {
  count?: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number
  perPageOptions?: number[]
  onPerPageChange?: (itemPerPage: number) => void
} & PaginationConditionals

/*const classNames = {
  //root: s.root,
  //container: s.container,
  //selectBox: s.selectBox,
  //select: s.select,
  item: s.item,
  //dots: s.dots,
  //icon: s.icon,
  pageButton(selected?: boolean) {
    return clsx(this.item, selected && s.selected)
  },
}*/

export const Pagination = ({ onChange, count = 10, page = 1, siblings }: PaginationProps) => {
  const {
    paginationRange,
    isLastPage,
    isFirstPage,
    handlePreviousPageClicked,
    handleNextPageClicked,
    handleMainPageClicked,
  } = usePagination({
    page,
    count,
    onChange,
    siblings,
  })

  return (
    <div className={s.root}>
      <div className={s.container}>
        <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />

        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />

        <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
      </div>
    </div>
  )
}

type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}

type PageButtonProps = NavigationButtonProps & {
  page: number
  selected: boolean
}

const Dots = () => {
  return <span className={s.dots}>&#8230;</span>
}
const PageButton = ({ onClick, disabled, selected, page }: PageButtonProps) => {
  const activePage = selected ? s.selected : ''

  return (
    <button
      onClick={onClick}
      disabled={selected || disabled}
      //className={classNames.pageButton(selected)}
      className={activePage}
    >
      {page}
    </button>
  )
}
const PrevButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      {/*<ArrowLeft className={classNames.icon} />*/}
      <ChevronLeftIcon className={s.icon} />
    </button>
  )
}

const NextButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      {/*<ArrowRight className={classNames.icon} />*/}
      <ChevronRightIcon className={s.icon} />
    </button>
  )
}

type MainPaginationButtonsProps = {
  paginationRange: (number | string)[]
  currentPage: number
  onClick: (pageNumber: number) => () => void
}

const MainPaginationButtons = ({
  paginationRange,
  currentPage,
  onClick,
}: MainPaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={index} />
        }

        return <PageButton key={index} page={page} selected={isSelected} onClick={onClick(page)} />
      })}
    </>
  )
}

export type PerPageSelectProps = {
  //perPage: number
  perPage: string
  perPageOptions: string[]
  onPerPageChange: (itemPerPage: string) => void
}

export const PerPageSelect = ({ perPage, perPageOptions, onPerPageChange }: PerPageSelectProps) => {
  const selectOptions = perPageOptions.map(value => ({
    label: value,
    value,
  }))

  return (
    <div className={s.selectBox}>
      Показать
      <Select
        className={s.select}
        value={perPage}
        selectOptions={selectOptions}
        onValueChange={onPerPageChange}
        //variant="pagination"
      />
      на странице
    </div>
  )
}
