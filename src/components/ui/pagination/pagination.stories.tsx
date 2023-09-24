import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from '@/components/ui'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationStory: Story = {
  args: {
    count: 100,
    page: 5,
    onChange: () => {},
  },
}

export const Default = () => {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(8)
  const TOTAL_PAGES_COUNT = 10

  return (
    <div>
      <Pagination
        onChange={setPage}
        count={TOTAL_PAGES_COUNT}
        page={page}
        perPage={perPage}
        perPageOptions={[5, 8, 12, 100]}
        onPerPageChange={setPerPage}
      />
      <div>Current page: {page}</div>
      <div>Per page: {perPage}</div>
    </div>
  )
}
