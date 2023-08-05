import { ReactNode } from 'react'

import s from './card.module.scss'

export type CardProps = {
  children: ReactNode
  variant: 'card'
  className?: string
}

export const Card = (props: CardProps) => {
  const { className, variant, ...rest } = props

  return <div className={`${s[variant]} ${className}`} {...rest}></div>
}
