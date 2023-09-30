import { ChangeEvent, Dispatch, SetStateAction } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './cards-modal.module.scss'

import { Button, Input, Modal, Typography } from '@/components'
import { useCreateCardMutation } from '@/services'
import { useUpdateCardMutation } from '@/services/cards/cards-api.ts'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  id?: string
  title: string
  cardId: string
  valueQuestion?: string
  valueAnswer?: string
  setValueAnswer: Dispatch<SetStateAction<string>>
  setValueQuestion: Dispatch<SetStateAction<string>>
}

type CardFormSchema = z.infer<typeof cardSchema>
const cardSchema = z.object({
  question: z.string().nonempty().min(3).max(30),
  answer: z.string().nonempty().min(3).max(30),
})

export const CardsModal = ({
  setIsModalOpen,
  isModalOpen,
  id,
  title,
  cardId,
  valueQuestion,
  valueAnswer,
  setValueQuestion,
  setValueAnswer,
}: Props) => {
  const [createCard] = useCreateCardMutation()
  const [updateCard] = useUpdateCardMutation()

  const onSubmit: SubmitHandler<CardFormSchema> = data => {
    title === 'Edit Card'
      ? updateCard({ id: cardId, answer: data.answer, question: data.question })
      : createCard({ id, answer: data.answer, question: data.question })

    reset()
    setIsModalOpen(false)
  }

  const answerHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueAnswer(e.currentTarget.value)
  }

  const questionHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueQuestion(e.currentTarget.value)
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CardFormSchema>({ resolver: zodResolver(cardSchema) })

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      showCloseButton={true}
      title={title}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputs}>
          <Input
            {...register('question')}
            name={'question'}
            label={'Question'}
            value={valueQuestion}
            errorMessage={errors.question?.message}
            onChange={questionHandler}
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

          {title === 'Edit Card' ? (
            <Button type={'submit'}>
              <Typography as={'h4'} variant={'subtitle2'}>
                Save Changes
              </Typography>
            </Button>
          ) : (
            <Button type={'submit'}>
              <Typography as={'h4'} variant={'subtitle2'}>
                Add New Card
              </Typography>
            </Button>
          )}
        </div>
      </form>
    </Modal>
  )
}
