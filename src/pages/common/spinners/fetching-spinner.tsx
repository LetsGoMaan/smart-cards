import { CSSProperties } from 'react'

import BarLoader from 'react-spinners/BarLoader'

const override: CSSProperties = {
  borderColor: '#8c61ff',
  backgroundColor: '#bea6ff',
  width: '100%',
}

export const FetchingSpinner = () => {
  return (
    <BarLoader
      color={'#8c61ff'}
      cssOverride={override}
      height={4}
      speedMultiplier={1}
      aria-label={'Loading Spinner'}
    />
  )
}
