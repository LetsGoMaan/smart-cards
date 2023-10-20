import { useState } from 'react'

import { Link, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

import s from './layout.module.scss'

import { defaultAvatar, logo, logOut, personOutline } from '@/assets'
import { Avatar, Button, DropDownItem, DropDownMenu, Header, NameWithAvatar } from '@/components'
import { successOptions } from '@/pages'
import { useAuthMeQuery, useLogoutMutation } from '@/services'

export const Layout = () => {
  //const authData = { isSignedIn: true, name: '', avatar: '', email: '' } //server-data
  const { data } = useAuthMeQuery() //server-data
  const [logout] = useLogoutMutation()
  const notification = `Bye-bye, ${data?.name || data?.email}`
  const logOutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        toast.success(notification, successOptions)
      })
  }
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuChange = (open: boolean) => {
    setMenuOpen(open)
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <Header>
        <Link to={'/'}>
          <img src={logo} alt={'logo'} />
        </Link>
        {data ? (
          <DropDownMenu
            onChange={handleMenuChange}
            isMenuOpen={menuOpen}
            align={'end'}
            trigger={
              <NameWithAvatar name={data.name || 'Yolo'} avatar={data.avatar || defaultAvatar} />
            }
          >
            <DropDownItem>
              <Avatar avatar={data.avatar || defaultAvatar} />
              <div>
                <div>{data.name || 'Yolo'}</div>
                <div className={s.email}>{data.email || 'ilikekovrizku@gmail.com'}</div>
              </div>
            </DropDownItem>
            <DropDownItem>
              <Link onClick={handleLinkClick} className={s.link} to={'/my-profile'}>
                {/* Из-за линка не закрывается дропдаун при переходе на новую страницу   */}
                <img src={personOutline} alt={'icon'} />
                <span>My profile</span>
              </Link>
            </DropDownItem>
            <DropDownItem>
              <button onClick={logOutHandler} className={s.link}>
                <img src={logOut} alt={'icon'} />
                <span>Sign Out</span>
              </button>
            </DropDownItem>
          </DropDownMenu>
        ) : (
          <Button className={s.signIn} variant={'primary'} as={Link} to={'/login'}>
            Sign In
          </Button>
        )}
      </Header>
      <Outlet />
    </>
  )
}
