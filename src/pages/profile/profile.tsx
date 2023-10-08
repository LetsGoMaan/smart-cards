import { defaultAvatar } from '@/assets'
import { PersonalInfo, PersonalInfoFormSchema } from '@/components'
import { useAuthMeQuery, useLogoutMutation, useUpdateMeMutation } from '@/services'

export const Profile = () => {
  const { data } = useAuthMeQuery() //change all data
  const name = data?.name || 'Yolo'
  const email = data?.email || 'yolo@superyolo.com'
  const avatar = data?.avatar || defaultAvatar
  const [logOut] = useLogoutMutation()
  const [updateMe] = useUpdateMeMutation()

  const changeAvatar = (avatar: Blob) => {
    const formData = new FormData()

    formData.append('avatar', avatar)
    updateMe(formData)
  }
  const submitChanges = (data: PersonalInfoFormSchema) => {
    const formData = new FormData()

    formData.append('name', data.nickname)
    formData.append('email', data.email)
    updateMe(formData)
  }

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
