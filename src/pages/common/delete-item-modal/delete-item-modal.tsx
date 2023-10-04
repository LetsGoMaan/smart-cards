import { useNavigate } from 'react-router-dom'

import s from './delete-item-modal.module.scss'

import { Button, Modal, Typography } from '@/components'
import { useDeleteDeckByIdMutation, useDeleteCardMutation } from '@/services'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  id: string
  deckName?: string
  cardName?: string
  title: string
  isNavigate?: boolean
}

export const DeleteItemModal = ({
  isModalOpen,
  setIsModalOpen,
  id,
  deckName,
  cardName,
  title,
  isNavigate,
}: Props) => {
  const navigate = useNavigate()
  const [deleteCard] = useDeleteCardMutation()
  const [deleteDeck] = useDeleteDeckByIdMutation()
  const deleteHandler = () => {
    if (title === 'Delete Pack') {
      deleteDeck({ id })
      setIsModalOpen(false)
      if (isNavigate) navigate(-1)
    } else {
      deleteCard({ id })
      setIsModalOpen(false)
    }
  }
  const isDeck = title === 'Delete Pack'

  return (
    <Modal
      title={title}
      isOpen={isModalOpen}
      showCloseButton={true}
      onClose={() => setIsModalOpen(false)}
    >
      <div className={s.text}>
        <div>
          <Typography as={'span'} variant={'body1'}>
            Do you really want to remove{' '}
          </Typography>
          <Typography as={'span'} variant={'subtitle1'}>
            {isDeck ? `pack ${deckName}?` : `card ${cardName}?`}
          </Typography>
        </div>
        <Typography as={'p'} variant={'body1'}>
          {isDeck ? 'All cards will be deleted.' : 'Your card will be deleted.'}
        </Typography>
      </div>

      <div className={`${s.buttons} ${s.deleteModalButtons}`}>
        <Button type={'button'} onClick={() => setIsModalOpen(false)} variant={'secondary'}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Cancel
          </Typography>
        </Button>
        <Button onClick={deleteHandler} type={'button'}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Delete {isDeck ? 'Pack' : 'Card'}
          </Typography>
        </Button>
      </div>
    </Modal>
  )
}
