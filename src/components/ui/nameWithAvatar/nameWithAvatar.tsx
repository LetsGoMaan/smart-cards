import s from './nameWithAvatar.module.scss'

import { Avatar } from '@/components/ui'

type Props = {
  name: string
  avatar: string
}
export const NameWithAvatar = ({ name, avatar }: Props) => {
  return (
    <div className={s.nameWithAvatarWrapper}>
      <span className={s.name}>{name}</span>
      <Avatar avatar={avatar} />
    </div>
  )
}
