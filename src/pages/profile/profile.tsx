import { toast } from 'react-toastify'

import { defaultAvatar } from '@/assets'
import { PersonalInfo, PersonalInfoFormSchema } from '@/components'
import { errorOptions, LoadingSpinner, successOptions } from '@/pages'
import { useAuthMeQuery, useLogoutMutation, useUpdateMeMutation } from '@/services'

export const Profile = () => {
  const { data } = useAuthMeQuery() //change all data
  const name = data?.name || 'Yolo'
  const email = data?.email || 'yolo@superyolo.com'
  const avatar = data?.avatar || defaultAvatar
  const [logOut, { isLoading: isLogouting }] = useLogoutMutation()
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation()

  const changeAvatar = (avatar: Blob) => {
    const formData = new FormData()

    formData.append('avatar', avatar)
    updateMe(formData)
      .unwrap()
      .then(() => {
        toast.success('Your avatar updated successfully', successOptions)
      })
      .catch(() => {
        toast.error('User not found', errorOptions)
      })
  }
  const submitChanges = (data: PersonalInfoFormSchema) => {
    const formData = new FormData()

    formData.append('name', data.nickname)
    formData.append('email', data.email)
    updateMe(formData)
      .unwrap()
      .then(() => {
        toast.success('Your profile updated successfully', successOptions)
      })
      .catch(() => {
        toast.error('User not found', errorOptions)
      })
  }

  if (isLogouting || isUpdating) return <LoadingSpinner />

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <PersonalInfo
        onSubmit={submitChanges}
        onLogOut={logOut}
        name={name}
        email={email}
        avatar={avatar}
        onChangeAvatar={changeAvatar}
      />
    </div>
  )
}
