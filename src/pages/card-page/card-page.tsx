import { useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './card-page.module.scss'

import { Button, Card, Typography } from '@/components'
import { Radio } from '@/components/ui/radioGroup'
import { BackButton } from '@/pages'
import { useGetDeckByIdQuery, useGetRandomCardQuery, useSaveCardRatingMutation } from '@/services'

export const CardPage = () => {
  const { id } = useParams()
  const [showAnswer, setShowAnswer] = useState(false)
  const [rating, setRating] = useState(0)
  const { data: deckData, isLoading: isDeckLoading } = useGetDeckByIdQuery({ id })
  const { data, isLoading } = useGetRandomCardQuery({
    id,
  })
  const [saveRating, {}] = useSaveCardRatingMutation()
  const optionsForRadio = [
    { id: 1, value: 'Did not know' },
    { id: 2, value: 'Forgot' },
    { id: 3, value: 'A lot of though' },
    { id: 4, value: 'Confused' },
    { id: 5, value: 'Knew the answer' },
  ]

  const showNewQuestion = () => {
    saveRating({
      id,
      cardId: data?.id,
      grade: rating,
    })
    setShowAnswer(false)
  }

  if (isLoading && isDeckLoading) return <div>loading...</div>

  return (
    <div>
      <div className={s.backButton}>
        <BackButton />
      </div>
      <div className={s.cardContainer}>
        <Card className={s.cardPage}>
          <Typography className={s.title} variant={'large'}>
            Learn {deckData?.name}
          </Typography>
          <div className={s.textWrapper}>
            <Typography as={'p'} variant={'subtitle1'}>
              Question:
            </Typography>
            <Typography className={s.question} as={'p'} variant={'body1'}>
              {data?.question}
            </Typography>
          </div>
          <div className={s.textWrapper}>
            <Typography as={'p'} className={s.shots} variant={'body2'}>
              Количество попыток ответов на вопрос:
            </Typography>
            <Typography as={'p'} className={s.shots} variant={'subtitle2'}>
              {data?.shots}
            </Typography>
          </div>
          {!showAnswer && (
            <Button
              onClick={() => setShowAnswer(true)}
              className={s.showAnswer}
              fullWidth={true}
              variant={'primary'}
            >
              Show Answer
            </Button>
          )}
          {showAnswer && (
            <>
              <div className={`${s.textWrapper} ${s.answer}`}>
                <Typography as={'p'} variant={'subtitle1'}>
                  Answer:
                </Typography>
                <Typography as={'p'} variant={'body1'}>
                  {data?.answer}
                </Typography>
              </div>
              <Typography as={'p'} className={s.radioTitle} variant={'subtitle1'}>
                Rate yourself
              </Typography>
              <Radio onChangeOption={rating => setRating(rating)} options={optionsForRadio} />
              <Button
                onClick={showNewQuestion}
                className={s.nextQuestion}
                fullWidth={true}
                variant={'primary'}
              >
                Next Question
              </Button>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
