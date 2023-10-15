import { CSSProperties } from 'react'

import PacmanLoader from 'react-spinners/PacmanLoader'

const loadingOverride: CSSProperties = {
  display: 'block',
  margin: '15% auto',
}

export const LoadingSpinner = () => {
  return (
    <PacmanLoader
      cssOverride={loadingOverride}
      color={'#8c61ff'}
      size={50}
      aria-label={'Loading Spinner'}
    />
  )
}
