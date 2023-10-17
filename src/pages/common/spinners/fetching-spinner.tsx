import { CSSProperties } from 'react'

import BarLoader from 'react-spinners/BarLoader'

type SpinnerProps = {
  loading?: boolean
  isMain?: boolean
  isProfile?: boolean
}
export const FetchingSpinner = ({ loading, isMain = false, isProfile = false }: SpinnerProps) => {
  const marginTop = isMain ? '-2.062rem' : ''
  const left = isProfile ? '0' : '-8.562rem'
  const top = isProfile ? '3.75rem' : ''
  const override: CSSProperties = {
    position: 'absolute',
    marginTop: marginTop,
    marginLeft: left,
    top: top,
    borderColor: '#8c61ff',
    backgroundColor: '#bea6ff',
    width: '100%',
  }

  return (
    <BarLoader
      color={'#8c61ff'}
      loading={loading}
      cssOverride={override}
      height={4}
      speedMultiplier={1}
      aria-label={'Loading Spinner'}
    />
  )
}
