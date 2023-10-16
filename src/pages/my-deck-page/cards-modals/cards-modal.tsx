import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from './cards-modal.module.scss'

import { Button, Input, Modal, Typography } from '@/components'
import { errorOptions, InputWithTypeFile, successOptions } from '@/pages'
import { useCreateCardMutation, useUpdateCardMutation } from '@/services'

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
  const [answerImgError, setAnswerImgError] = useState('')
  const [questionImgError, setQuestionImgError] = useState('')
  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardFormSchema>({ resolver: zodResolver(cardSchema) })

  const onCloseHandler = () => {
    reset()
    setQuestionPreview('')
    setAnswerPreview('')
    setQuestionImgError('')
    setAnswerImgError('')
    setIsModalOpen(false)
  }

  const onSubmit: SubmitHandler<CardFormSchema> = data => {
    if (title === 'Edit Card') {
      updateCard({
        id: cardId,
        answer: data.answer,
        question: data.question,
        answerImg: !answerImgError && data.answerImg[0],
        questionImg: !questionImgError && data.questionImg[0],
      })
        .unwrap()
        .then(() => {
          toast.success(`Your card updated successfully`, successOptions)
        })
        .catch(e => {
          toast.error(e.data.message, errorOptions)
        })
    } else {
      createCard({
        id,
        answer: data.answer,
        question: data.question,
        answerImg: !answerImgError && data.answerImg[0],
        questionImg: !questionImgError && data.questionImg[0],
      })
        .unwrap()
        .then(() => {
          toast.success(`Your card created successfully`, successOptions)
        })
        .catch(() => {
          toast.error('Something went wrong, try again', errorOptions)
        })
    }
    onCloseHandler()
  }

  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueAnswer && setValueAnswer(e.currentTarget.value)
  }

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueQuestion && setValueQuestion(e.currentTarget.value)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const question = event.currentTarget.name === 'questionImg'
    const answer = event.currentTarget.name === 'answerImg'
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      question && setQuestionImgError('Only JPEG and PNG images are allowed.')
      answer && setAnswerImgError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      question && setQuestionImgError('The image size should not exceed 1MB.')
      answer && setAnswerImgError('The image size should not exceed 1MB.')

      return
    }

    question && setQuestionPreview(URL.createObjectURL(file))
    answer && setAnswerPreview(URL.createObjectURL(file))
    setQuestionImgError('')
    setAnswerImgError('')
  }

  const questionSrc = questionPreview || questionImg
  const answerSrc = answerPreview || answerImg

  return (
    <Modal
      isOpen={isModalOpen}
      //onClose={() => setIsModalOpen(false)}
      onClose={onCloseHandler}
      showCloseButton={true}
      title={title}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputs}>
          <InputWithTypeFile
            name={'questionImg'}
            imageSrc={questionSrc}
            handleFileChange={handleImageChange}
            errorMessage={questionImgError}
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

          <InputWithTypeFile
            name={'answerImg'}
            imageSrc={answerSrc}
            handleFileChange={handleImageChange}
            errorMessage={answerImgError}
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
          <Button type={'button'} onClick={onCloseHandler} variant={'secondary'}>
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
