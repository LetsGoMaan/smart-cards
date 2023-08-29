import { ReactNode } from 'react'

import * as DialogRadixUI from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'

import s from './modal.module.scss'

import { Typography } from '@/components/ui'

type ModalProps = {
  children: ReactNode
  isOpen: boolean
  onClose?: (value: boolean) => void
  showCloseButton?: boolean
  title?: string
}

const dropIn = {
  hidden: {
    y: '-100vh',
    x: '-50%',
    opacity: 0,
  },
  visible: {
    y: '-50%',
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
  const handleModalClose = () => {
    onClose?.(false)
  }

  return (
    <DialogRadixUI.Root open={isOpen} onOpenChange={handleModalClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogRadixUI.Portal>
            <DialogRadixUI.Overlay className={s.dialogOverlay} asChild>
              <motion.div
                className={s.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleModalClose}
              />
            </DialogRadixUI.Overlay>
            <DialogRadixUI.Content className={s.dialogContent}>
              <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit">
                <div className={s.modal}>
                  {showCloseButton && (
                    <div className={s.titleWrapper}>
                      <DialogRadixUI.Title className={s.dialogTitle}>
                        <Typography className={s.title} variant={'h2'}>
                          {title}
                        </Typography>
                      </DialogRadixUI.Title>
                      <DialogRadixUI.Close asChild>
                        <button aria-label={'Close'}>
                          <Cross2Icon className={s.closeMark} />
                        </button>
                      </DialogRadixUI.Close>
                    </div>
                  )}
                  <div className={s.modalContent}>{children}</div>
                </div>
              </motion.div>
            </DialogRadixUI.Content>
          </DialogRadixUI.Portal>
        )}
      </AnimatePresence>
    </DialogRadixUI.Root>
  )
}
