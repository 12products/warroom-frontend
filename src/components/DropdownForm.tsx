import { Component, createSignal } from 'solid-js'
import { useField } from 'solid-js-form'
import { DropdownPropertyOption } from '../types/Incident'

import IncidentPropertyDropdown from './IncidentPropertyDropdown'

type Props = {
  options: DropdownPropertyOption[]
  field: string
  placeholder: string
}

const DropdownForm: Component<Props> = ({ options, field, placeholder }) => {
  const [getSelected, setSelected] = createSignal('')
  const { form } = useField(field)

  const onSelected = (option: DropdownPropertyOption) => {
    form.setValue(field, option.id)
    setSelected(option.label)
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

export default DropdownForm
