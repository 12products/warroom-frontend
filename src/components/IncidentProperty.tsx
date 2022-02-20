import { Accessor, Component, createSignal } from 'solid-js'

import { DropdownPropertyOption } from '../types/incident'
import IncidentPropertyDropdown from './Dropdown'
import { getOption } from '../utils/getOption'

type Props = {
  label: string
  options: DropdownPropertyOption[]
  selected: string | null
}

const IncidentProperty: Component<Props> = ({ label, selected, options }) => {
  const [getSelected, setSelected] = createSignal(
    selected ? getOption(selected, options)?.label : null
  )

  const onSelected = (option: DropdownPropertyOption) => {
    setSelected(option.label)
  }

  return (
    <div class="grid gap-4 grid-cols-3">
      <div class="flex items-center text-zinc-500">{label}</div>

      <div class="col-span-2">
        <IncidentPropertyDropdown
          placeholder={label}
          selected={getSelected as Accessor<string>}
          options={options}
          onSelected={onSelected}
        />
      </div>
    </div>
  )
}

export default IncidentProperty
