import { ChangeEvent, useState } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './personal-info.module.scss'

import { defaultAvatar, editButton, logOut } from '@/assets'
import { Avatar, Button, Card, ControlledInput, Typography } from '@/components'

type PersonalInfoProps = {
  onSubmit?: (data: PersonalInfoFormSchema) => void
  onChangeAvatar?: (avatar: File) => void
  onLogOut?: () => void
  avatar?: string
  name: string
  email: string
}

type PersonalInfoFormSchema = z.infer<typeof PersonalInfoSchema>

const PersonalInfoSchema = z.object({
  nickname: z.string().nonempty(),
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalInfoFormSchema>({ resolver: zodResolver(PersonalInfoSchema) })

  const onSubmitHandler = (data: PersonalInfoFormSchema) => {
    onSubmit && onSubmit(data)
    setEditMode(false)
  }

  const onChangeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files?.length && onChangeAvatar?.(e.target.files[0])
  }

  return (
    <Card className={s.personalInfoWrapper}>
      <Typography variant={'large'} className={s.title}>
        Personal Information
      </Typography>
      <Avatar avatar={avatar} size={96} className={s.avatar} />
      <div className={s.inputWrapper}>
        <input
          type="file"
          name="file"
          id="input-file"
          className={`${s.inputFile} ${s.input}`}
          multiple
          onChange={onChangeAvatarHandler}
        />
        <label htmlFor="input-file" className={s.addPhotoBtn}>
          <img className={s.inputIcon} src={editButton} alt={'choose image'} />
        </label>
      </div>
      {editMode ? (
        <form onSubmit={handleSubmit(onSubmitHandler)} className={s.formWrapper}>
          <DevTool control={control} />
          <ControlledInput
            className={s.nickname}
            name={'nickname'}
            control={control}
            label={'Nickname'}
            errorMessage={errors.nickname?.message}
          />
          <Button type={'submit'} className={s.buttonSubmit} fullWidth={true}>
            Save Changes
          </Button>
        </form>
      ) : (
        <div className={s.infoContainer}>
          <div className={s.editNameWrapper}>
            <Typography variant={'h1'} className={s.name}>
              {name}
            </Typography>
            {/*<input type="file" />*/}
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
