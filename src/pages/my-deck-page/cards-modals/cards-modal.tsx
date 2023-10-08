import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './cards-modal.module.scss'

import { Button, Input, Modal, Typography } from '@/components'
import { InputWithTypeFile } from '@/pages'
import { useCreateCardMutation } from '@/services'
import { useUpdateCardMutation } from '@/services/cards/cards-api.ts'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  id?: string
  title?: string
  cardId?: string
  buttonTitle?: string
  valueQuestion?: string
  valueAnswer?: string
  questionImg?: string
  answerImg?: string
  setValueAnswer?: Dispatch<SetStateAction<string>>
  setValueQuestion?: Dispatch<SetStateAction<string>>
}

type CardFormSchema = z.infer<typeof cardSchema>
const cardSchema = z.object({
  question: z.string().nonempty().min(3).max(500),
  answer: z.string().nonempty().min(3).max(500),
  questionImg: z.any(),
  answerImg: z.any(),
})

export const CardsModal = ({
  setIsModalOpen,
  isModalOpen,
  id,
  title,
  cardId,
  buttonTitle,
  valueQuestion,
  valueAnswer,
  questionImg,
  answerImg,
  setValueQuestion,
  setValueAnswer,
}: Props) => {
  const [questionPreview, setQuestionPreview] = useState('')
  const [answerPreview, setAnswerPreview] = useState('')
  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardFormSchema>({ resolver: zodResolver(cardSchema) })

  const onSubmit: SubmitHandler<CardFormSchema> = data => {
    title === 'Edit Card'
      ? updateCard({
          id: cardId,
          answer: data.answer,
          question: data.question,
          answerImg: data.answerImg[0],
          questionImg: data.questionImg[0],
        })
      : createCard({
          id,
          answer: data.answer,
          question: data.question,
          answerImg: data.answerImg[0],
          questionImg: data.questionImg[0],
        })

    reset()
    setQuestionPreview('')
    setAnswerPreview('')
    setIsModalOpen(false)
  }

  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueAnswer && setValueAnswer(e.currentTarget.value)
  }

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueQuestion && setValueQuestion(e.currentTarget.value)
  }

  const handleQuestionFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      setQuestionPreview(URL.createObjectURL(files[0]))
    }
  }
  const handleAnswerFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      setAnswerPreview(URL.createObjectURL(files[0]))
    }
  }

  const questionSrc = questionPreview || questionImg
  const answerSrc = answerPreview || answerImg

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      showCloseButton={true}
      title={title}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputs}>
          {/*{questionPreview && (
            <img className={s.coverPreview} src={questionPreview} alt={'image'} />
          )}*/}
          <InputWithTypeFile
            name={'questionImg'}
            imageSrc={questionSrc}
            handleFileChange={handleQuestionFileChange}
            register={register}
          />
          <Input
            {...register('question')}
            name={'question'}
            label={'Question'}
            value={valueQuestion}
            errorMessage={errors.question?.message}
            onChange={questionHandler}
          />

          {/*{answerPreview && <img className={s.coverPreview} src={answerPreview} alt={'image'} />}*/}
          <InputWithTypeFile
            name={'answerImg'}
            imageSrc={answerSrc}
            handleFileChange={handleAnswerFileChange}
            register={register}
          />
          <Input
            {...register('answer')}
            name={'answer'}
            label={'Answer'}
            value={valueAnswer}
            errorMessage={errors.answer?.message}
            onChange={answerHandler}
          />
        </div>
        <div className={s.buttons}>
          <Button type={'button'} onClick={() => setIsModalOpen(false)} variant={'secondary'}>
            <Typography as={'h4'} variant={'subtitle2'}>
              Cancel
            </Typography>
          </Button>

          <Button type={'submit'}>
            <Typography as={'h4'} variant={'subtitle2'}>
              {buttonTitle}
            </Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
