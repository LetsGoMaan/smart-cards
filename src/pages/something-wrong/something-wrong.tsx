import s from './something-wrong.module.scss'

import { defaultAvatar } from '@/assets'
import { Typography } from '@/components'

export const SomethingWrong = () => {
  return (
    <div className={s.container}>
      <img className={s.icon} src={defaultAvatar} alt={'sad face'} />
      <Typography variant={'h1'}>Oops, something went wrong. Please try again.</Typography>
    </div>
  )
}
