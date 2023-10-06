import { ChangeEvent } from 'react'

//import { FieldValues, UseFormRegister } from 'react-hook-form'

import s from './input-with-type-file.module.scss'

import { imageIcon } from '@/assets'
import { Typography } from '@/components'

type InputProps = {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  //register: UseFormRegister<FieldValues>
  //register: UseFormRegister<{ name: string; isPackPrivate: boolean; cover?: any }>
  register: any
}
export const InputWithTypeFile = ({ handleFileChange, register }: InputProps) => {
  return (
    <div className={s.inputFileWrapper}>
      <div className={s.changeCover}>
        <img src={imageIcon} alt={'picture'} />
        <Typography as={'span'} variant={'subtitle2'}>
          Change Cover
        </Typography>
        <input
          type={'file'}
          {...register('cover')}
          name={'cover'}
          className={s.inputFile}
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}
