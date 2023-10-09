import { ChangeEvent, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './deck-modal.module.scss'

import { Button, ControlledCheckbox, Input, Modal, Typography } from '@/components'
import { InputWithTypeFile } from '@/pages'
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
  deckCover?: string | null | undefined
  modalTitle: string
  buttonTitle: string
  isModalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
}

export type PackFormSchema = z.infer<typeof packSchema>
export const packSchema = z.object({
  name: z.string().nonempty().min(3).max(30),
  isPackPrivate: z.boolean().default(false),
  cover: z.any(),
})

export const DeckModal = ({
  isModalOpen,
  setModalOpen,
  id,
  deckCover,
  modalTitle,
  buttonTitle,
}: EditModalProps) => {
  const { editDeckName, addDeckName } = useAppSelector(state => state.decks)
  const dispatch = useAppDispatch()
  const [coverPreview, setCoverPreview] = useState('')

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
    const formData = new FormData()
    const isPackPrivate = data.isPackPrivate ? 'true' : 'false'

    formData.append('cover', data.cover[0])
    formData.append('name', data.name)
    formData.append('isPrivate', isPackPrivate)

    if (modalTitle === 'Add New Pack') {
      //createDeck({ name: data.packName })
      createDeck(formData)
      dispatch(setDeckName(''))
    } else {
      //updateDeck({ id, name: data.name })
      updateDeck({ id, name: data.name, cover: data.cover[0], isPrivate: data.isPackPrivate })
    }
    reset()
    setCoverPreview('')
    setModalOpen(false)
  }

  const inputValue = modalTitle === 'Add New Pack' ? addDeckName : editDeckName

  const setEditName = (e: ChangeEvent<HTMLInputElement>) => {
    if (modalTitle === 'Add New Pack') {
      dispatch(setDeckName(e.currentTarget.value))
    } else {
      dispatch(setEditDeckName(e.currentTarget.value))
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files

    if (files && files.length > 0) {
      setCoverPreview(URL.createObjectURL(files[0]))
    }
  }

  const imgSrc = coverPreview || deckCover

  return (
    <Modal
      title={modalTitle}
      showCloseButton={true}
      onClose={() => setModalOpen(false)}
      isOpen={isModalOpen}
    >
      <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <InputWithTypeFile
          name={'cover'}
          handleFileChange={handleFileChange}
          imageSrc={imgSrc}
          register={register}
        />

        <Input
          className={s.addInput}
          label={'Name Pack'}
          {...register('name')}
          //value={addDeckName}
          value={inputValue}
          onChange={setEditName}
          errorMessage={errors.name?.message}
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
