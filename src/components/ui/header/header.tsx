import { useState } from 'react'

import ava from './../../../assets/avatar.png'
import logOut from './../../../assets/log-out.svg'
import logo from './../../../assets/logo.svg'
import profile from './../../../assets/person-outline.svg'
import s from './header.module.scss'

import { Button, DropDownMenu, Option } from '@/components/ui'

export type HeaderProps = {
  isSignedIn: boolean
}
export const Header = ({ isSignedIn }: HeaderProps) => {
  const name = 'Ivan' //from server
  const email = 'j&johnson@gmail.com' //from server
  const avatar = ava //from server
  const menuData: Option[] = [
    { id: '', icon: avatar, email: email, value: name },
    { id: '', icon: profile, value: 'My Profile' },
    { id: '', icon: logOut, value: 'Sign Out' },
  ]
  const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false)
  const showMenu = () => {
    setIsDropDownMenuOpen(!isDropDownMenuOpen)
  }

  return (
    <div className={s.headerWrapper}>
      <img className={s.logo} src={logo} alt="logo" />
      {isSignedIn ? (
        <div className={s.withAvatar}>
          <span className={s.name}>{name}</span>{' '}
          <img className={s.avatar} src={avatar} alt={'avatar'} onClick={showMenu} />
          {isDropDownMenuOpen ? (
            <div className={s.headerMenu}>
              <DropDownMenu options={menuData} isMenuOpen={isDropDownMenuOpen} />
            </div>
          ) : null}{' '}
        </div>
      ) : (
        <Button className={'primary'}>{'Sign in'}</Button>
      )}{' '}
    </div>
  )
}
