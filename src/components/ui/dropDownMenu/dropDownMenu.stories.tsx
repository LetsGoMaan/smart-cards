import type { Meta, StoryObj } from '@storybook/react'

import { DropDownItem, DropDownMenu } from './'

import { avatar, logOut, personOutline } from '@/assets'
import { Avatar } from '@/components/ui'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDown: Story = {
  render: args => {
    return <DropDownMenu {...args} />
  },
  args: {
    trigger: <Avatar avatar={avatar} />,
    children: (
      <>
        <DropDownItem>
          <Avatar avatar={avatar} />
          <div>
            <div>Ivan</div>
            <div>j&johnson@gmail.com</div>
          </div>
        </DropDownItem>
        <DropDownItem>
          <img src={personOutline} alt={'icon'} />
          <div>My profile</div>
        </DropDownItem>
        <DropDownItem>
          <img src={logOut} alt={'icon'} />
          <div>SignOut</div>
        </DropDownItem>
      </>
    ),
    align: 'start',
  },
}
