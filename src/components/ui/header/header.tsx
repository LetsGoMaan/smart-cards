import { ReactNode } from 'react'

import s from './header.module.scss'

export type HeaderProps = {
  isSignedIn?: boolean
  children: ReactNode
}
export const Header = ({ children }: HeaderProps) => {
  return <div className={s.headerWrapper}>{children}</div>
}
