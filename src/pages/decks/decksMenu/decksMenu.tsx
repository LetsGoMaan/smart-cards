import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './decksMenu.module.scss'

import { deleteOutline } from '@/assets'
import {
  Button,
  ControlledCheckbox,
  ControlledInput,
  Input,
  Modal,
  Slider,
  TabSwitcher,
  Typography,
} from '@/components'
import { decksSlice, useAppDispatch, useAppSelector, useCreateDeckMutation } from '@/services'

type PackFormSchema = z.infer<typeof packSchema>
const packSchema = z.object({
  packName: z.string().nonempty().max(30),
  isPackPrivate: z.boolean().default(false),
})

export const DecksMenu = () => {
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

  const dispatch = useAppDispatch()
  const { searchByName, minCardsCount, maxCardsCount } = useAppSelector(state => state.decks)
  const [isModalOpen, setModalOpen] = useState(false)
  const [createDeck, {}] = useCreateDeckMutation()

  const tabs = [
    {
      value: 'myCards',
      title: 'My Cards',
    },
    {
      value: 'allCards',
      title: 'All Cards',
    },
  ]
  const authorId = 'f2be95b9-4d07-4751-a775-bd612fc9553a' //from response
  const [tabValue, setTabValue] = useState(tabs[1].value)

  const setSearchByName = (search: string) => dispatch(decksSlice.actions.setSearchByName(search))

  const setCardsByAuthor = (tabValue: string) => {
    if (tabValue === 'myCards') {
      dispatch(decksSlice.actions.setCardsByAuthor(authorId))
      setTabValue(tabs[0].value)
    } else {
      dispatch(decksSlice.actions.setCardsByAuthor(''))
      setTabValue(tabs[1].value)
    }
  }
  const setMinMaxValue = (value: number[]) => {
    dispatch(decksSlice.actions.setMinMaxCardsCount(value))
  }

  const setDefaultValues = () => {
    dispatch(decksSlice.actions.setDefaultValues())
    setTabValue(tabs[1].value)
  }

  return (
    <div className={s.menuWrapper}>
      <div className={s.titleAndButton}>
        <Typography as={'p'} variant={'large'} className={s.title}>
          Packs list
        </Typography>
        <Button onClick={() => setModalOpen(true)}>
          <Typography as={'h4'} variant={'subtitle2'}>
            Add New Pack{' '}
          </Typography>
        </Button>
      </div>
      <div className={s.menuItems}>
        <Input
          onClearClick={() => setSearchByName('')}
          value={searchByName}
          type={'search'}
          placeholder={'Input search'}
          onChangeValue={value => setSearchByName(value)}
        />
        <TabSwitcher
          value={tabValue}
          onValueChange={setCardsByAuthor}
          label={'Show packs cards'}
          tabs={tabs}
        />
        <Slider
          min={0}
          max={100}
          onChange={setMinMaxValue}
          label={'Number of cards'}
          value={[+minCardsCount, +maxCardsCount]}
        />
        <Button onClick={setDefaultValues} variant={'secondary'}>
          <img src={deleteOutline} alt={'clear'} />
          <Typography as={'h4'} variant={'subtitle2'}>
            Clear filter
          </Typography>
        </Button>
      </div>
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
                Add New Pack{' '}
              </Typography>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
