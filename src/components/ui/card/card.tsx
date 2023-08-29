import { ReactNode } from 'react'

import s from './card.module.scss'

export type CardProps = {
  children: ReactNode
  className?: string
}

export const Card = (props: CardProps) => {
  const { className, ...rest } = props

  return <div className={`${s.card} ${className}`} {...rest}></div>
}
