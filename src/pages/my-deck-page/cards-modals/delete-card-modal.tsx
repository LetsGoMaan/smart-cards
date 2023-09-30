import { Button, Modal, Typography } from '@/components'
import s from '@/pages/my-deck-page/cards-modals/cards-modal.module.scss'
import { useDeleteCardMutation } from '@/services/cards/cards-api.ts'

type Props = {
  isModalOpen: boolean
  setIsModalOpen: (open: boolean) => void
  id: string
}

export const DeleteCardModal = ({ isModalOpen, setIsModalOpen, id }: Props) => {
  const [deleteCard] = useDeleteCardMutation()

  const deleteHandler = () => {
    deleteCard({ id })
    setIsModalOpen(false)
  }

  return (
    <Modal
      title={'Delete Card'}
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
            Card Name?
          </Typography>
        </div>
        <Typography as={'p'} variant={'body1'}>
          All cards will be deleted.
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
            Delete Card
          </Typography>
        </Button>
      </div>
    </Modal>
  )
}
