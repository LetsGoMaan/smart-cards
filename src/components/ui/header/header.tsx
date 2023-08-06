import logo from './../../../assets/logo.svg'
import s from './header.module.scss'

import { Button } from '@/components/ui'

export type HeaderProps = {
  isSignedIn: boolean
}
export const Header = ({ isSignedIn }: HeaderProps) => {
  return (
    <div className={s.headerWrapper}>
      <img className={s.logo} src={logo} alt="logo" />
      {isSignedIn ? <div>DropDownMenu</div> : <Button className={'primary'}>{'Sign in'}</Button>}
    </div>
  )
}
