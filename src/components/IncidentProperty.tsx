import { Accessor, Component, createEffect, createSignal } from 'solid-js'
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
  options: () => DropdownOption[]
  selected: string | null
}

const IncidentProperty: Component<Props> = ({ label, selected, options }) => {
  const params = useParams()
  const [getSelected, setSelected] = createSignal<string | null>(null)

  createEffect(() => {
    if (selected && options()?.length) {
      const newSelectedOption = getOption(selected, options())?.label
      newSelectedOption && setSelected(newSelectedOption)
    }
  })

  const [_, updateIncident] = createMutation(UPDATE_INCIDENT_MUTATION)

  const onSelected = (option: DropdownOption) => {
    setSelected(option.label)
    const key = label === 'Assignee' ? 'assigneeId' : label.toLowerCase()
    updateIncident({ input: { [key]: option?.id, id: params.id } })
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
