import { Component, createSignal } from 'solid-js'

import { DropdownPropertyOption } from '../types/Incident'

type Props = {
  onClick: (id: string) => void
} & DropdownPropertyOption

const IncidentPropertyDropdown: Component<Props> = ({ id, label, onClick }) => {
  return (
    <div
      class="hover:bg-zinc-700 p-2 hover:cursor-pointer capitalize"
      onClick={() => onClick(id)}
    >
      {label.toLowerCase()}
    </div>
  )
}

export default IncidentPropertyDropdown
