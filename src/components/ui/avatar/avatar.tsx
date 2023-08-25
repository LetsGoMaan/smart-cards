import s from './avatar.module.scss'

type Props = {
  avatar: string
  size?: number
}

export const Avatar = ({ avatar, size = 36 }: Props) => {
  return (
    <>
      <img className={s.avatar} src={avatar} alt={'avatar'} width={size} height={size} />
    </>
  )
}
