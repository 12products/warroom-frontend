import { Component, createSignal } from 'solid-js'

import { IncidentPropertyOption } from '../types/Incident'

type Props = {
  onClick: (id: string) => void
} & IncidentPropertyOption

const IncidentPropertyDropdown: Component<Props> = ({ id, label, onClick }) => {
  return (
    <div
      class="hover:bg-zinc-700 p-2 hover:cursor-pointer"
      onClick={() => onClick(id)}
    >
      {label}
    </div>
  )
}

export default IncidentPropertyDropdown
