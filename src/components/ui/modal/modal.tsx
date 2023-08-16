//import { ReactNode, useState } from 'react'
import { ReactNode } from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import closeMark from './../../../assets/xMark.svg'
import s from './modal.module.scss'

import { Card, Typography } from '@/components/ui'

type ModalProps = {
  children: ReactNode
  isOpen: boolean
  onClose?: (value: boolean) => void
  showCloseButton: boolean
  title?: string
}

const dropIn = {
  hidden: {
    y: '-100vh',
    x: '-50%',
    opacity: 0,
  },
  visible: {
    //y: '-50%',
    y: '250px',
    //x: '-50%',
    x: '0%',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
}

export const Modal = ({ children, isOpen, showCloseButton, title, onClose }: ModalProps) => {
  //const [isModalOpen, setIsModalOpen] = useState(isOpen)
  /*const closeModal = () => {
    setIsModalOpen(false)
    console.log(isModalOpen)
  }*/
  const handleModalClosed = () => {
    onClose?.(false)
  }

  return (
    /*<div className={s.wrapper} onClick={closeModal}>*/
    <div className={s.wrapper} onClick={handleModalClosed}>
      <AnimatePresence>
        {/*{isModalOpen && (*/}
        {isOpen && (
          <>
            <motion.div
              className={s.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit">
              <Card variant={'card'} className={s.modal}>
                {showCloseButton && (
                  <div className={s.titleWrapper}>
                    <Typography className={s.title} variant={'h2'}>
                      {title}
                    </Typography>
                    <img
                      /*onClick={closeModal}*/
                      onClick={handleModalClosed}
                      className={s.closeMark}
                      src={closeMark}
                      alt={'close'}
                    />
                  </div>
                )}
                <div className={s.modalContent}>{children}</div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
