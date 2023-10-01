import { ChangeEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './deck-modal.module.scss'

import { Button, ControlledCheckbox, Input, Modal, Typography } from '@/components'
import { PackFormSchema, packSchema } from '@/pages'
import {
  decksSlice,
  useAppDispatch,
  useAppSelector,
  useCreateDeckMutation,
  useUpdateDeckMutation,
} from '@/services'

type EditModalProps = {
  id?: string
  deckName?: string
  modalTitle?: string
  buttonTitle?: string
  isModalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
}
export const DeckModal = ({
  isModalOpen,
  setModalOpen,
  id,
  modalTitle,
  buttonTitle,
}: EditModalProps) => {
  const editName = useAppSelector(state => state.decks.editName)
  const dispatch = useAppDispatch()
  //const [editDeckName, setEditDeckName] = useState(deckName)

  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PackFormSchema>({ resolver: zodResolver(packSchema) })

  const onSubmit: SubmitHandler<PackFormSchema> = data => {
    if (modalTitle === 'Add New Pack') {
      createDeck({ name: data.packName })
    } else {
      updateDeck({ id, name: data.packName })
    }
    reset()
    setModalOpen(false)
  }

  const setEditName = (e: ChangeEvent<HTMLInputElement>) => {
    //setEditDeckName(name)
    dispatch(decksSlice.actions.setEditName(e.currentTarget.value))
  }

  return (
    <Modal
      title={modalTitle}
      showCloseButton={true}
      onClose={() => setModalOpen(false)}
      isOpen={isModalOpen}
    >
      <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={'Name Pack'}
          {...register('packName')}
          //value={editDeckName}
          //value={deckName}
          value={editName}
          //onChangeValue={value => setEditName(value)}
          //onChangeValue={value => setEditDeckName(value)}
          //onChange={e => setEditDeckName(e.currentTarget.value)}
          onChange={setEditName}
          //onChangeValue={setEditName}
          errorMessage={errors.packName?.message}
        />
        <ControlledCheckbox name={'isPackPrivate'} control={control} label={'Private pack'} />

        <div className={s.modalButtons}>
          <Button type={'button'} onClick={() => setModalOpen(false)} variant={'secondary'}>
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
