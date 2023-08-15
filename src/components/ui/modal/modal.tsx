import { ReactNode, useState } from 'react'

import closeMark from './../../../assets/xMark.svg'
import s from './modal.module.scss'

import { Card, Typography } from '@/components/ui'

type ModalProps = {
  children: ReactNode
  isOpen: boolean
  isCloseMark: boolean
  title?: string
}

export const Modal = ({ children, isOpen, isCloseMark, title }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return isModalOpen ? (
    <div className={s.wrapper}>
      <div onClick={closeModal} className={s.modalWrapper}></div>
      <Card variant={'card'} className={s.modal}>
        {isCloseMark && (
          <div className={s.titleWrapper}>
            <Typography className={s.title} variant={'h2'}>
              {title}
            </Typography>
            <img onClick={closeModal} className={s.closeMark} src={closeMark} alt={'close'} />
          </div>
        )}
        <div className={s.modalContent}>{children}</div>
      </Card>
    </div>
  ) : null
}
