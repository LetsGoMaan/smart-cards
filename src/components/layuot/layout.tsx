import { Link, Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { defaultAvatar, logo, logOut, personOutline } from '@/assets'
import { Avatar, Button, DropDownItem, DropDownMenu, Header, NameWithAvatar } from '@/components'

export const Layout = () => {
  const authData = { isSignedIn: true, name: '', avatar: '', email: '' } //server-data

  return (
    <>
      <Header>
        <img src={logo} alt={'logo'} />
        {authData.isSignedIn ? (
          <DropDownMenu
            trigger={
              <NameWithAvatar
                name={authData.name || 'Yolo'}
                avatar={authData.avatar || defaultAvatar}
              />
            }
          >
            <DropDownItem>
              <Avatar avatar={authData.avatar || defaultAvatar} />
              <div>
                <div>{authData.name || 'Yolo'}</div>
                <div className={s.email}>{authData.email || 'ilikekovrizku@gmail.com'}</div>
              </div>
            </DropDownItem>
            <DropDownItem>
              <Link className={s.link} to={'/my-profile'}>
                <img src={personOutline} alt={'icon'} />
                <span>My profile</span>
              </Link>
            </DropDownItem>
            <DropDownItem>
              <Link className={s.link} to={'/sign-in'}>
                <img src={logOut} alt={'icon'} />
                <span>SignOut</span>
              </Link>
            </DropDownItem>
          </DropDownMenu>
        ) : (
          <Button variant={'primary'}>Sign In</Button>
        )}
      </Header>
      <Outlet />
    </>
  )
}
