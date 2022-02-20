import { Component } from 'solid-js'
import classnames from 'classnames'
import { useNavigate, useMatch } from 'solid-app-router'

import { IncidentsSidebarItem as IncidentsSidebarItemType } from '../types/ui'

type Props = {
  item: IncidentsSidebarItemType
}

const IncidentsSidebarItem: Component<Props> = ({ item: { title, route } }) => {
  const navigate = useNavigate()
  const isActive = useMatch(() => route)

  return (
    <h3
      class={classnames(
        {
          'bg-zinc-700': Boolean(isActive()),
        },
        'px-2 p-1 rounded hover:bg-zinc-700 hover:cursor-pointer'
      )}
      onClick={() => navigate(route)}
    >
      {title}
    </h3>
  )
}

export default IncidentsSidebarItem
