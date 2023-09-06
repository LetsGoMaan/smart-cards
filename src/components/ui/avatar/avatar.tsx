import s from './avatar.module.scss'

type Props = {
  avatar: string
  size?: number
  className?: string
}

export const Avatar = ({ avatar, size = 36, className }: Props) => {
  return (
    <>
      <img
        className={`${s.avatar} ${className}`}
        src={avatar}
        alt={'avatar'}
        width={size}
        height={size}
      />
    </>
  )
}
