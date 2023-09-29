import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './deck-modal.module.scss'

import { Button, ControlledCheckbox, ControlledInput, Modal, Typography } from '@/components'
import { useCreateDeckMutation } from '@/services'

export type PackFormSchema = z.infer<typeof packSchema>
export const packSchema = z.object({
  packName: z.string().nonempty().min(3).max(30),
  isPackPrivate: z.boolean().default(false),
})

type AddModalProps = {
  isModalOpen: boolean
  setModalOpen: (isOpen: boolean) => void
}

export const DeckModalAdd = ({ isModalOpen, setModalOpen }: AddModalProps) => {
  const [createDeck, {}] = useCreateDeckMutation()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PackFormSchema>({ resolver: zodResolver(packSchema) })

  const onSubmit: SubmitHandler<PackFormSchema> = data => {
    createDeck({ name: data.packName })
    reset()
    setModalOpen(false)
  }

  return (
    <Modal
      title={'Add New Pack'}
      showCloseButton={true}
      onClose={() => setModalOpen(false)}
      isOpen={isModalOpen}
    >
      <form className={s.modalForm} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          name={'packName'}
          control={control}
          label={'Name Pack'}
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
              Add New Pack
            </Typography>
          </Button>
        </div>
      </form>
    </Modal>
  )
}
