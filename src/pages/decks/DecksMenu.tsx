import s from './decks.module.scss'

import { deleteOutline } from '@/assets'
import { Button, Input, TabSwitcher, Typography } from '@/components'
import { Slider } from '@/components/ui/slider'

export const DecksMenu = () => {
  const tabs = [
    {
      value: 'tab1',
      title: 'My Cards',
    },
    {
      value: 'tab2',
      title: 'All Cards',
    },
  ]

  return (
    <div className={s.menuWrapper}>
      <div className={s.titleAndButton}>
        <Typography variant={'large'} className={s.title}>
          Packs list
        </Typography>
        <Button>Add New Pack</Button>
      </div>
      <div className={s.menuItems}>
        <Input type={'search'} placeholder={'Input search'} />
        <TabSwitcher tabs={tabs} />
        <Slider value={[1, 10]} />
        <Button variant={'secondary'}>
          <img src={deleteOutline} alt={'clear'} />
          <span>Clear Filter</span>
        </Button>
      </div>
    </div>
  )
}
