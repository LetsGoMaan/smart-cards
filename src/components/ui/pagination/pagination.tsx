import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { Select } from '../select'

import s from './pagination.module.scss'
import { usePagination } from './usePagination'

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
  className?: string
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
  perPage?: number | null
  perPageOptions?: number[]
  onPerPageChange?: (itemPerPage: number) => void
} & PaginationConditionals

export const Pagination = ({
  className,
  onChange,
  count = 10,
  page = 1,
  perPage = null,
  perPageOptions,
  onPerPageChange,
  siblings,
}: PaginationProps) => {
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

  const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange

  return (
    <div className={`${s.root} ${className}`}>
      <div className={s.container}>
        <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />

        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />

        <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
      </div>

      {showPerPageSelect && (
        <PerPageSelect
          {...{
            perPage,
            perPageOptions,
            onPerPageChange,
          }}
        />
      )}
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
    <button onClick={onClick} disabled={selected || disabled} className={`${activePage} ${s.item}`}>
      {page}
    </button>
  )
}
const PrevButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
      <ChevronLeftIcon className={s.icon} />
    </button>
  )
}

const NextButton = ({ onClick, disabled }: NavigationButtonProps) => {
  return (
    <button className={s.item} onClick={onClick} disabled={disabled}>
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
  perPage: number
  perPageOptions: number[]
  onPerPageChange: (itemPerPage: number) => void
}

export const PerPageSelect = ({ perPage, perPageOptions, onPerPageChange }: PerPageSelectProps) => {
  const selectOptions = perPageOptions.map(value => ({
    label: value.toString(),
    value: value.toString(),
  }))
  const selectPerPage = perPage.toString()
  const onPerPageChangeHandler = (itemPerPage: string) => {
    onPerPageChange(+itemPerPage)
  }

  return (
    <div className={s.selectBox}>
      Show
      <Select
        className={s.select}
        value={selectPerPage}
        selectOptions={selectOptions}
        onValueChange={onPerPageChangeHandler}
        //variant="pagination"
      />
      on page
    </div>
  )
}
