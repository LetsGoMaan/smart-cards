import { ChangeEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './deck-modal.module.scss'

import { Button, ControlledCheckbox, Input, Modal, Typography } from '@/components'
import {
  setDeckName,
  setEditDeckName,
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

export type PackFormSchema = z.infer<typeof packSchema>
export const packSchema = z.object({
  packName: z.string().nonempty().min(3).max(30),
  isPackPrivate: z.boolean().default(false),
})

export const DeckModal = ({
  isModalOpen,
  setModalOpen,
  id,
  modalTitle,
  buttonTitle,
}: EditModalProps) => {
  const { editDeckName, addDeckName } = useAppSelector(state => state.decks)
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
      dispatch(setDeckName(''))
    } else {
      updateDeck({ id, name: data.packName })
    }
    reset()
    setModalOpen(false)
  }

  const setEditName = (e: ChangeEvent<HTMLInputElement>) => {
    if (modalTitle === 'Add New Pack') {
      dispatch(setDeckName(e.currentTarget.value))
    } else {
      dispatch(setEditDeckName(e.currentTarget.value))
    }
  }

  return (
    <Modal
      title={modalTitle}
      showCloseButton={true}
      onClose={() => setModalOpen(false)}
      isOpen={isModalOpen}
    >
      <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
        {modalTitle === 'Add New Pack' ? (
          <Input
            label={'Name Pack'}
            {...register('packName')}
            value={addDeckName}
            onChange={setEditName}
            errorMessage={errors.packName?.message}
          />
        ) : (
          <Input
            label={'Name Pack'}
            {...register('packName')}
            value={editDeckName}
            onChange={setEditName}
            errorMessage={errors.packName?.message}
          />
        )}

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
