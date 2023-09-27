import { Link, Outlet, useNavigate } from 'react-router-dom'

import s from './layout.module.scss'

import { defaultAvatar, logo, logOut, personOutline } from '@/assets'
import { Avatar, Button, DropDownItem, DropDownMenu, Header, NameWithAvatar } from '@/components'
import { useAuthMeQuery, useLogoutMutation } from '@/services'

export const Layout = () => {
  //const authData = { isSignedIn: true, name: '', avatar: '', email: '' } //server-data
  const { data } = useAuthMeQuery() //server-data
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const logOutHandler = () => {
    logout()
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  return (
    <>
      <Header>
        <img src={logo} alt={'logo'} />
        {data ? (
          <DropDownMenu
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
              <Link className={s.link} to={'/my-profile'}>
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
          <Button variant={'primary'}>Sign In</Button>
        )}
      </Header>
      <Outlet />
    </>
  )
}
