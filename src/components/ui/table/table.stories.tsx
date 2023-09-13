import { useMemo, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import {
  Sort,
  Table,
  TableBody,
  TableData,
  TableHead,
  //TableHeader,
  TableHeaderData,
  TableRow,
} from './'

import { Typography } from '@/components'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const columnsData = [
  { id: 'aa', title: 'Name' },
  { id: 'bb', title: 'Cards' },
  { id: 'cc', title: 'Last Updated' },
  { id: 'dd', title: 'Create by' },
  { id: 'ee', title: '' },
]

const data = [
  {
    id: '00',
    name: 'Pack Name 1',
    cards: 4,
    lastUpdated: new Date().toLocaleDateString('ru-Ru'),
    createdBy: 'Yolo',
  },
  {
    id: '01',
    name: 'Pack Name 2',
    cards: 5,
    lastUpdated: new Date().toLocaleDateString('ru-Ru'),
    createdBy: 'Yololo',
  },
  {
    id: '02',
    name: 'Pack Name 3',
    cards: 2,
    lastUpdated: new Date().toLocaleDateString('ru-Ru'),
    createdBy: 'Yolola',
  },
  {
    id: '03',
    name: 'Pack Name 4',
    cards: 3,
    lastUpdated: new Date().toLocaleDateString('ru-Ru'),
    createdBy: 'Yololy',
  },
]

export const TableStory: Story = {
  args: {
    children: (
      <Table>
        <TableHead>
          <TableRow>
            {columnsData.map(col => (
              <TableHeaderData key={col.id}>
                <Typography as={'h3'} variant={'subtitle2'} style={{ color: '#fff' }}>
                  {col.title}
                </Typography>
              </TableHeaderData>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(d => (
            <TableRow key={d.id}>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  {d.name}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  {d.cards}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  {d.lastUpdated}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  {d.createdBy}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  icons...
                </Typography>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
  },
}

const dataForSort = [
  {
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
  },
  {
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
  },
  {
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
  },
  {
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
  },
  {
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
  },
]
const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'cardsCount',
    title: 'Cards',
  },
  {
    key: 'updated',
    title: 'Last Updated',
  },
  {
    key: 'createdBy',
    title: 'Created by',
  },
]

export const TableStoryWithSort: Story = {
  render: () => {
    const [sort, setSort] = useState<Sort>(null)
    const sortedString = useMemo(() => {
      if (!sort) return null

      return `${sort.key}-${sort.direction}`
    }, [sort])

    console.log(sortedString)

    const handleSort = (key: string) => {
      if (sort && sort.key === key && sort.direction === 'desc') {
        setSort(null)

        return
      }
      if (sort && sort.key === key) {
        setSort({
          key,
          direction: sort.direction === 'asc' ? 'desc' : 'asc',
        })
      } else {
        setSort({
          key,
          direction: 'asc',
        })
      }
    }

    return (
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableHeaderData onClick={() => handleSort(column.key)} key={column.key}>
                {' '}
                <Typography as={'h3'} variant={'subtitle2'} style={{ color: '#fff' }}>
                  {column.title}{' '}
                  {sort && sort.key === column.key && (
                    <span>{sort.direction === 'asc' ? '▲' : '▼'}</span>
                  )}
                </Typography>
              </TableHeaderData>
            ))}
          </TableRow>
        </TableHead>
        {/*<TableHeader columns={columns} sort={sort} onSort={setSort}></TableHeader>*/}
        <TableBody>
          {dataForSort.map(d => (
            <TableRow key={d.title}>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  {d.title}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  {d.cardsCount}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  {d.updated}
                </Typography>
              </TableData>
              <TableData>
                <Typography as={'p'} variant={'body2'} style={{ color: '#fff' }}>
                  {d.createdBy}{' '}
                </Typography>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  },
}
