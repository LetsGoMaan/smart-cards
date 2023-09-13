import type { Meta, StoryObj } from '@storybook/react'

import {
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
