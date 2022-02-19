import { Component } from 'solid-js'

import { IncidentPropertyOption } from '../types/Incident'
import IncidentPropertyDropdown from './IncidentPropertyDropdown'

type Props = {
  label: string
  selected: string
  options: IncidentPropertyOption[]
}

const IncidentProperty: Component<Props> = ({ label, selected, options }) => {
  return (
    <div class="grid gap-4 grid-cols-3">
      <div class="flex items-center text-zinc-500">{label}</div>

      <div class="col-span-2">
        <IncidentPropertyDropdown
          label={label}
          selected={selected}
          options={options}
        />
      </div>
    </div>
  )
}

export default IncidentProperty
