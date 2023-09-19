import s from './back-button.module.scss'

import arrowBack from '@/assets/arrowBack.svg'
import { Typography } from '@/components'

export const BackButton = () => {
  return (
    <>
      <button className={s.backToPackListButton}>
        <img src={arrowBack} className={s.arrowLeftIcon} alt={'arrowBack'} />
        <Typography variant={'body2'} as={'p'}>
          Back to Packs List
        </Typography>
      </button>
    </>
  )
}
