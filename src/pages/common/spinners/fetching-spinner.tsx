import { CSSProperties } from 'react'

import BarLoader from 'react-spinners/BarLoader'

const override: CSSProperties = {
  position: 'absolute',
  marginLeft: '-8.562rem',
  borderColor: '#8c61ff',
  backgroundColor: '#bea6ff',
  width: '100%',
}

const mainOverride: CSSProperties = {
  position: 'absolute',
  marginTop: '-2.062rem',
  marginLeft: '-8.562rem',
  borderColor: '#8c61ff',
  backgroundColor: '#bea6ff',
  width: '100%',
}

type SpinnerProps = {
  loading?: boolean
  isMain?: boolean
}
export const FetchingSpinner = ({ loading, isMain = false }: SpinnerProps) => {
  return (
    <BarLoader
      color={'#8c61ff'}
      loading={loading}
      cssOverride={isMain ? mainOverride : override}
      height={4}
      speedMultiplier={1}
      aria-label={'Loading Spinner'}
    />
  )
}
