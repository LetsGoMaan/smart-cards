import { useNavigate } from 'react-router-dom'

import s from './back-button.module.scss'

import { arrowBack } from '@/assets'
import { Typography } from '@/components'

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <>
      <button onClick={() => navigate(-1)} className={s.backToPackListButton}>
        <img src={arrowBack} className={s.arrowLeftIcon} alt={'arrowBack'} />
        <Typography variant={'body2'} as={'p'}>
          Back to Packs List
        </Typography>
      </button>
    </>
  )
}
