import { defaultAvatar } from '@/assets'
import { PersonalInfo, PersonalInfoFormSchema } from '@/components'

export const Profile = () => {
  //change all data
  const name = '' || 'Yolo'
  const email = '' || 'yolo@superyolo.com'
  const avatar = '' || defaultAvatar
  const logOut = () => {}
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
