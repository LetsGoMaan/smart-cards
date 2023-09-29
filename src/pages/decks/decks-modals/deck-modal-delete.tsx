import { Button, Modal, Typography } from '@/components'
import s from '@/pages/decks/decks-modals/deck-modal.module.scss'
import { useDeleteDeckByIdMutation } from '@/services'

type DeleteModalProps = {
  id: string
  isModalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
  deckName: string
}
export const DeckModalDelete = ({ isModalOpen, setModalOpen, id, deckName }: DeleteModalProps) => {
  const [deleteDeck] = useDeleteDeckByIdMutation()
  const deleteHandler = () => {
    deleteDeck({ id })
    setModalOpen(false)
  }

  return (
    <Modal
      title={'Delete Pack'}
      showCloseButton={true}
      onClose={() => setModalOpen(false)}
      isOpen={isModalOpen}
    >
      <div className={s.modalForm}>
        <Typography className={s.deleteText} as={'p'} variant={'body1'}>
          <p>
            Do you really want to remove{' '}
            <Typography as={'span'} variant={'subtitle2'}>
              {deckName}
            </Typography>
            ?
          </p>{' '}
          <p>All cards will be deleted.</p>
        </Typography>
        <div className={s.modalButtons}>
          <Button onClick={() => setModalOpen(false)} variant={'secondary'}>
            <Typography as={'h4'} variant={'subtitle2'}>
              Cancel
            </Typography>
          </Button>
          <Button onClick={deleteHandler}>
            <Typography as={'h4'} variant={'subtitle2'}>
              Delete Pack
            </Typography>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
