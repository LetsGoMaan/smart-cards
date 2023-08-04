import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'h1',
        'large',
        'h2',
        'h3',
        'body1',
        'subtitle1',
        'body2',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
      ],
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'Large Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
  },
}

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'H1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
  },
}

export const H2: Story = {
  args: {
    variant: 'h2',
    children: 'H2 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'h2',
  },
}

export const H3: Story = {
  args: {
    variant: 'h3',
    children: 'H3 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'h3',
  },
}

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'h3',
  },
}

export const Subtitle1: Story = {
  args: {
    variant: 'subtitle1',
    children: 'Subtitle 1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'h3',
  },
}

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'h4',
  },
}

export const Subtitle2: Story = {
  args: {
    variant: 'subtitle2',
    children: 'Subtitle 2 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'h4',
  },
}

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'h5',
  },
}

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'Overline Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'h5',
  },
}

export const Link1: Story = {
  args: {
    variant: 'link1',
    children: 'Link 1 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'a',
  },
}

export const Link2: Story = {
  args: {
    variant: 'link2',
    children: 'Link 2 Carosserie Test Zürich Stauffacherstrasse 31 8004 Zürich, ZH, CH',
    as: 'a',
  },
}
