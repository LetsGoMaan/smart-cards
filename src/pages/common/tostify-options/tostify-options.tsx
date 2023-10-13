import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'

export const successOptions = {
  icon: <CheckIcon style={{ background: '#8c61ff' }} />,
  style: { background: '#333' },
  progressStyle: { background: '#8c61ff' },
}

export const errorOptions = {
  icon: <Cross1Icon style={{ background: '#CC1439', color: 'black' }} />,
  style: { background: '#333' },
  progressStyle: { background: '#CC1439' },
}
