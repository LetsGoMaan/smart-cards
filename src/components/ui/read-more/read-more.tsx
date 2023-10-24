import { useState } from 'react'

import s from './read-more.module.scss'

import { Typography } from '@/components'

type ReadMoreProps = {
  text: string
}
export const ReadMore = ({ text }: ReadMoreProps) => {
  const [hideText, setHideText] = useState(true)
  const textLength = text.length
  const maxLength = 15
  const lessText = text.slice(0, maxLength) + '... '

  if (textLength <= maxLength) return <div>{text}</div>

  return (
    <>
      {hideText ? lessText : `${text} `}
      <Typography
        as={'span'}
        variant={'link1'}
        onClick={() => setHideText(!hideText)}
        className={s.more}
      >
        {hideText ? 'More' : 'Hide'}
      </Typography>
    </>
  )
}
