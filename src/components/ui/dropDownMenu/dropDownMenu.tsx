import s from './dropDownMenu.module.scss'

export type Option = {
  id: string
  icon: string
  value: string
  email?: string
}
export type DropDownMenuProps = {
  options: Option[]
  isMenuOpen: boolean
}
export const DropDownMenu = ({ options, isMenuOpen }: DropDownMenuProps) => {
  const isOpen = isMenuOpen ? 'openMenu' : ''

  return (
    <div className={`${s.menuWrapper} ${s[isOpen]}`}>
      <div className={s.menuContent}>
        {options.map(o => {
          return (
            <div className={s.menuIconWrapper} key={o.id}>
              <a href={'#'} className={s.menuIcon}>
                <img src={o.icon} alt={'icon'} />
                <span className={s.value}>
                  <span className={o.email ? s.name : ''}>{o.value}</span>
                  <span className={s.email}>{o.email}</span>
                </span>
              </a>
              <div className={s.line}></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
