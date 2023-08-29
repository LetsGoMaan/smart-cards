import type { Meta, StoryObj } from '@storybook/react'

import avatar from './../../../assets/avatar.png'
import logo from './../../../assets/logo.svg'

import { Header } from './'

import { Button } from '@/components/ui'
import { NameWithAvatar } from '@/components/ui/nameWithAvatar/nameWithAvatar.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithButton: Story = {
  args: {
    isSignedIn: false,
    children: (
      <>
        <img src={logo} alt="logo" />
        <Button variant={'primary'}>Sign In</Button>
      </>
    ),
  },
}

export const HeaderWithDropDownMenu: Story = {
  args: {
    isSignedIn: true,
    children: (
      <>
        <img src={logo} alt="logo" />
        <NameWithAvatar name={'Ivan'} avatar={avatar} />
      </>
    ),
  },
}
