---
# Use the built-in Home layout
layout: home

# Page metadata
title: WD_BYPASS

# Hero section configuration
hero:
  name: WD_BYPASS
  text: Bypass Tool Distribution
  tagline: Official website and app distribution for WD_BYPASS
  actions:
    - theme: brand
      text: Get Started
      link: /guide
    - theme: alt
      text: View on GitHub
      link: https://github.com/WD-BYPASS/WD_BYPASS

# Feature grid
features:
  - title: Useful Features
    details: Awesome features that make life easier.
  - title: Fast Docs
    details: VitePress-powered documentation with instant dev server and static output.
  - title: Easy Install
    details: Easy to install, just download the EXE.
---

## Quick Links

- Guide → [guide](/guide)
- Info → [info](/info)
- Rules → [rules](/rules)
- Download → [download](/download)

## CONTACT THE DEVS:
The devs can be contacted at the following email: WDBYPASSdevteam@gmail.com.  Only use this if discussions, Discord, or issues don't work to reach us, or if it is private/urgent.

<script setup>
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
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members />
