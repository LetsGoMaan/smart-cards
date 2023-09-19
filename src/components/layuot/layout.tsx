import { Link, Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { defaultAvatar, logo, logOut, personOutline } from '@/assets'
import { Avatar, Button, DropDownItem, DropDownMenu, Header, NameWithAvatar } from '@/components'
import { useLogoutMutation } from '@/services'

export const Layout = () => {
  const authData = { isSignedIn: true, name: '', avatar: '', email: '' } //server-data
  const [logout] = useLogoutMutation()

  return (
    <>
      <Header>
        <img src={logo} alt={'logo'} />
        {authData.isSignedIn ? (
          <DropDownMenu
            align={'end'}
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
                {/* Из-за линка не закрывается дропдаун при переходе на новую страницу   */}
                <img src={personOutline} alt={'icon'} />
                <span>My profile</span>
              </Link>
            </DropDownItem>
            <DropDownItem>
              <Link onClick={() => logout()} className={s.link} to={'/sign-in'}>
                <img src={logOut} alt={'icon'} />
                <span>Sign Out</span>
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
