import { ChangeEvent, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import s from './deck-modal.module.scss'

import { Button, ControlledCheckbox, Input, Modal, Typography } from '@/components'
import { errorOptions, InputWithTypeFile, successOptions } from '@/pages'
import {
  setCurrentPage,
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
  const [coverError, setCoverError] = useState('')

  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PackFormSchema>({ resolver: zodResolver(packSchema) })

  const onCloseHandler = () => {
    reset()
    setCoverPreview('')
    setCoverError('')
    setModalOpen(false)
  }

  const onSubmit: SubmitHandler<PackFormSchema> = data => {
    const formData = new FormData()
    const isPackPrivate = data.isPackPrivate ? 'true' : 'false'

    !coverError && formData.append('cover', data.cover[0])
    formData.append('name', data.name)
    formData.append('isPrivate', isPackPrivate)

    if (modalTitle === 'Add New Pack') {
      createDeck(formData)
        .unwrap()
        .then(data => {
          toast.success(`Pack ${data.name} created successfully`, successOptions)
          dispatch(setCurrentPage(1))
        })
        .catch(() => {
          toast.error('Something went wrong, try again', errorOptions)
        })
      dispatch(setDeckName(''))
    } else {
      updateDeck({
        id,
        name: data.name,
        cover: !coverError && data.cover[0],
        isPrivate: data.isPackPrivate,
      })
        .unwrap()
        .then(data => {
          toast.success(`Pack ${data.name} updated successfully`, successOptions)
        })
        .catch(e => {
          toast.error(e.data.message, errorOptions)
        })
    }
    onCloseHandler()
  }

  const inputValue = modalTitle === 'Add New Pack' ? addDeckName : editDeckName

  const setEditName = (e: ChangeEvent<HTMLInputElement>) => {
    if (modalTitle === 'Add New Pack') {
      dispatch(setDeckName(e.currentTarget.value))
    } else {
      dispatch(setEditDeckName(e.currentTarget.value))
    }
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      setCoverError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      setCoverError('The image size should not exceed 1MB.')

      return
    }

    setCoverPreview(URL.createObjectURL(file))
    setCoverError('')
  }

  const imgSrc = coverPreview || deckCover

  return (
    <Modal title={modalTitle} showCloseButton={true} onClose={onCloseHandler} isOpen={isModalOpen}>
      <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <InputWithTypeFile
          name={'cover'}
          //handleFileChange={handleFileChange}
          handleFileChange={handleImageChange}
          imageSrc={imgSrc}
          register={register}
          errorMessage={coverError}
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
