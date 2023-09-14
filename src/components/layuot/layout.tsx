import { Outlet } from 'react-router-dom'

import { defaultAvatar, logo } from '@/assets'
import { Button, Header, NameWithAvatar } from '@/components'

export const Layout = () => {
  const authData = { isSignedIn: true, name: '', avatar: '' } //server-data

  return (
    <>
      <Header>
        <img src={logo} alt={'logo'} />
        {authData.isSignedIn ? (
          <NameWithAvatar
            name={authData.name || 'Yolo'}
            avatar={authData.avatar || defaultAvatar}
          />
        ) : (
          <Button variant={'primary'}>Sign In</Button>
        )}
      </Header>
      <Outlet />
    </>
  )
}
