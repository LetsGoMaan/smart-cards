import type { Meta, StoryObj } from '@storybook/react'

import avatar from './../../../assets/avatar.png'
import deleteIcon from './../../../assets/delete-outline.svg'
import edit from './../../../assets/edit-outline.svg'
import logOut from './../../../assets/log-out.svg'
import profile from './../../../assets/person-outline.svg'
import learn from './../../../assets/play-circle-outline.svg'

import { DropDownMenu } from './'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const LessDropDownMenuStory: Story = {
  args: {
    options: [
      { id: '00', icon: learn, value: 'Learn' },
      { id: '11', icon: edit, value: 'Edit' },
      { id: '22', icon: deleteIcon, value: 'Delete' },
    ],
    isMenuOpen: true,
  },
}

export const DropDownMenuWithAvatar: Story = {
  args: {
    options: [
      { id: '001', icon: avatar, value: 'Ivan', email: 'j&johnson@gmail.com' },
      { id: '111', icon: profile, value: 'My Profile' },
      { id: '221', icon: logOut, value: 'Sign Out' },
    ],
    isMenuOpen: true,
  },
}
