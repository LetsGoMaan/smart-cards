import { defaultAvatar } from '@/assets'
import { PersonalInfo, PersonalInfoFormSchema } from '@/components'
import { useLogoutMutation } from '@/services'

export const Profile = () => {
  //change all data
  const name = '' || 'Yolo'
  const email = '' || 'yolo@superyolo.com'
  const avatar = '' || defaultAvatar
  const [logOut] = useLogoutMutation()
  const changeAvatar = (avatar: File) => {
    avatar
  }
  const submitChanges = (data: PersonalInfoFormSchema) => {
    data
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
