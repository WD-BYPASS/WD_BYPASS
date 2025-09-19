import DefaultTheme from 'vitepress/theme'
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/187664439?v=4',
    name: 'TheCrazy8',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/TheCrazy8' }
    ]
  },
  ...
]

export default {
  ...DefaultTheme
}
