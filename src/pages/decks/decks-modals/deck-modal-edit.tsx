import { ChangeEvent } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import s from './deck-modal.module.scss'

import { Button, ControlledCheckbox, Input, Modal, Typography } from '@/components'
import { PackFormSchema, packSchema } from '@/pages'
import { decksSlice, useAppDispatch, useAppSelector, useUpdateDeckMutation } from '@/services'

type EditModalProps = {
  id: string
  deckName: string
  isModalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
}
export const DeckModalEdit = ({ isModalOpen, setModalOpen, id }: EditModalProps) => {
  const editName = useAppSelector(state => state.decks.editName)
  const dispatch = useAppDispatch()
  //const [editDeckName, setEditDeckName] = useState(deckName)

  const [updateDeck] = useUpdateDeckMutation()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PackFormSchema>({ resolver: zodResolver(packSchema) })

  const onSubmit: SubmitHandler<PackFormSchema> = data => {
    updateDeck({ id, name: data.packName })
    reset()
    setModalOpen(false)
  }

  const setEditNameE = (e: ChangeEvent<HTMLInputElement>) => {
    //setEditDeckName(name)
    dispatch(decksSlice.actions.setEditName(e.currentTarget.value))
  }

  return (
    <Modal
      title={'Edit Pack'}
      showCloseButton={true}
      onClose={() => setModalOpen(false)}
      isOpen={isModalOpen}
    >
      <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
        {/*<ControlledInput
          name={'packName'}
          control={control}
          label={'Edit Pack'}
          errorMessage={errors.packName?.message}
        />*/}
        <Input
          label={'Edit Pack'}
          {...register('packName')}
          //value={editDeckName}
          //value={deckName}
          value={editName}
          //onChangeValue={value => setEditName(value)}
          //onChangeValue={value => setEditDeckName(value)}
          //onChange={e => setEditDeckName(e.currentTarget.value)}
          onChange={setEditNameE}
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
              Save Changes
            </Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
