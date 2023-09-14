import { Link, Outlet } from 'react-router-dom'

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
                <div>{authData.email || 'ilikekovrizku@gmail.com'}</div>
              </div>
            </DropDownItem>
            <Link to={'/my-profile'}>
              <DropDownItem>
                <img src={personOutline} alt={'icon'} />
                <div>My profile</div>
              </DropDownItem>
            </Link>
            <Link to={'/sign-in'}>
              <DropDownItem>
                <img src={logOut} alt={'icon'} />
                <div>SignOut</div>
              </DropDownItem>
            </Link>
            {/*<NameWithAvatar
            name={authData.name || 'Yolo'}
            avatar={authData.avatar || defaultAvatar}
          />*/}
          </DropDownMenu>
        ) : (
          <Button variant={'primary'}>Sign In</Button>
        )}
      </Header>
      <Outlet />
    </>
  )
}
