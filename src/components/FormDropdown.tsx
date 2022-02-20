import { Component, createSignal } from 'solid-js'
import { useField } from 'solid-js-form'
import { DropdownOption } from '../types/ui'

import IncidentPropertyDropdown from './Dropdown'

type Props = {
  options: DropdownOption[]
  field: string
  placeholder: string
}

const FormDropdown: Component<Props> = ({ options, field, placeholder }) => {
  const [getSelected, setSelected] = createSignal<string | null>(null)
  const { form } = useField(field)

  const onSelected = (option: DropdownOption | null) => {
    setSelected(option?.label || null)
    option && form.setValue(field, option.id)
  }

  return (
    <div class="border text-zinc-400 rounded">
      <IncidentPropertyDropdown
        placeholder={placeholder}
        selected={getSelected}
        options={options}
        onSelected={onSelected}
      />
    </div>
  )
}

export default FormDropdown
