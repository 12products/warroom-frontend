import { Accessor, Component, createSignal } from 'solid-js'
import { createMutation } from 'solid-urql'
import { useParams } from 'solid-app-router'

import { DropdownOption } from '../types/ui'
import Dropdown from './Dropdown'
import { getOption } from '../utils/getOption'

const UPDATE_INCIDENT_MUTATION = `
  mutation($input: UpdateIncidentInput!) {
    updateIncident(updateIncidentInput: $input){
      id
    }
  }
`

type Props = {
  label: string
  options: DropdownOption[]
  selected: string | null
}

const IncidentProperty: Component<Props> = ({ label, selected, options }) => {
  const params = useParams()
  const [getSelected, setSelected] = createSignal(
    selected ? getOption(selected, options)?.label : null
  )
  const [_, updateIncident] = createMutation(UPDATE_INCIDENT_MUTATION)

  const onSelected = (option: DropdownOption | null) => {
    setSelected(option?.label)

    const key = label.toLowerCase()
    updateIncident({ input: { [key]: option?.label, id: params.id } })
  }

  return (
    <div class="grid gap-4 grid-cols-3">
      <div class="flex items-center text-zinc-500">{label}</div>

      <div class="col-span-2">
        <Dropdown
          placeholder={label}
          selected={getSelected as Accessor<string>}
          options={options}
          onSelected={onSelected}
          dropdownClass="border border-transparent"
        />
      </div>
    </div>
  )
}

export default IncidentProperty
