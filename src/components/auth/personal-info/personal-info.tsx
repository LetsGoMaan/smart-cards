import { ChangeEvent, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './personal-info.module.scss'

import { defaultAvatar, editButton, logOut } from '@/assets'
import { Avatar, Button, Card, Input, Typography } from '@/components'

type PersonalInfoProps = {
  onSubmit?: (data: PersonalInfoFormSchema) => void
  onChangeAvatar?: (avatar: Blob) => void
  onLogOut?: () => void
  avatar?: string
  name: string
  email: string
}

export type PersonalInfoFormSchema = z.infer<typeof PersonalInfoSchema>

const PersonalInfoSchema = z.object({
  nickname: z.string().nonempty().min(3).max(30),
  file: z.any(),
  email: z.string().email().nonempty(),
})

export const PersonalInfo = ({
  onSubmit,
  onChangeAvatar,
  avatar = defaultAvatar,
  name,
  email,
  onLogOut,
}: PersonalInfoProps) => {
  const [editMode, setEditMode] = useState(false)
  const [editName, setEditName] = useState(name)
  const [editEmail, setEditEmail] = useState(email)
  const [avatarError, setAvatarError] = useState('')

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<PersonalInfoFormSchema>({ resolver: zodResolver(PersonalInfoSchema) })

  const onSubmitHandler = (data: PersonalInfoFormSchema) => {
    onSubmit && onSubmit(data)
    setEditMode(false)
  }

  const onCancelHandler = () => {
    setEditMode(false)
    reset()
  }

  const onChangeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png']

    if (!allowedTypes.includes(file.type)) {
      setAvatarError('Only JPEG and PNG images are allowed.')

      return
    }
    const maxSizeInBytes = 1024 * 1024

    if (file.size > maxSizeInBytes) {
      setAvatarError('The image size should not exceed 1MB.')

      return
    }
    onChangeAvatar?.(file)
    setAvatarError('')
  }

  return (
    <Card className={s.personalInfoWrapper}>
      <Typography variant={'large'} className={s.title}>
        Personal Information
      </Typography>
      <Avatar avatar={avatar} size={96} className={s.avatar} />

      <form onSubmit={handleSubmit(onSubmitHandler)} className={s.formWrapper}>
        <div className={s.changeAvatar}>
          <input
            type={'file'}
            {...register('file')}
            name={'file'}
            className={s.inputFile}
            onChange={onChangeAvatarHandler}
          />
          <img className={s.addPhotoBtn} src={editButton} alt={'picture'} />
        </div>
        <div className={s.errorMessage}>{avatarError}</div>

        <DevTool control={control} />
        {editMode && (
          <>
            <Input
              className={s.input}
              {...register('nickname')}
              name={'nickname'}
              label={'Nickname'}
              errorMessage={errors.nickname?.message}
              value={editName}
              onChange={e => setEditName(e.currentTarget.value)}
            />
            <Input
              className={s.input}
              {...register('email')}
              name={'email'}
              label={'Email'}
              errorMessage={errors.email?.message}
              value={editEmail}
              onChange={e => setEditEmail(e.currentTarget.value)}
            />
            <Button type={'submit'} className={s.buttonSubmit} fullWidth={true}>
              Save Changes
            </Button>
            <Button
              onClick={onCancelHandler}
              type={'button'}
              className={s.buttonSubmit}
              variant={'secondary'}
              fullWidth={true}
            >
              Cancel
            </Button>
          </>
        )}
      </form>
      {!editMode && (
        <div className={s.infoContainer}>
          <div className={s.editNameWrapper}>
            <Typography variant={'h1'} className={s.name}>
              {name}
            </Typography>
            <button onClick={() => setEditMode(true)} className={s.editNameButton}>
              <img src={editButton} alt="editButton" />
            </button>
          </div>
          <Typography variant={'body2'} className={s.email}>
            {email}
          </Typography>
          <Button
            onClick={onLogOut}
            variant={'secondary'}
            type={'submit'}
            className={s.buttonLogOut}
          >
            <img src={logOut} alt="logOutButton" />
            Logout
          </Button>
        </div>
      )}
    </Card>
  )
}
