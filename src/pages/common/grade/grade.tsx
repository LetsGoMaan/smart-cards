import { starFullIcon, starIcon } from '@/assets'

type GradeProps = {
  grade: number
}
export const Grade = ({ grade }: GradeProps) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <img src={grade >= 1 ? starFullIcon : starIcon} alt={'star'} />
      <img src={grade >= 2 ? starFullIcon : starIcon} alt={'star'} />
      <img src={grade >= 3 ? starFullIcon : starIcon} alt={'star'} />
      <img src={grade >= 4 ? starFullIcon : starIcon} alt={'star'} />
      <img src={grade >= 5 ? starFullIcon : starIcon} alt={'star'} />
    </div>
  )
}
