import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './typography.module.scss'
export type TypographyProps<T extends ElementType = 'h1'> = {
  as?: T
  children: ReactNode
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'body1'
    | 'subtitle1'
    | 'body2'
    | 'subtitle2'
    | 'caption'
    | 'overline'
    | 'link1'
    | 'link2'
  className?: string
} & ComponentPropsWithoutRef<T>
export const Typography = <T extends ElementType = 'h1'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { variant = 'h1', className, as: Component = 'h1', ...rest } = props

  return <Component className={`${s[variant]} ${className}`} {...rest} />
}
