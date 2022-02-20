import { Component, createSignal } from 'solid-js'
import { useField } from 'solid-js-form'
import { DropdownOption } from '../types/ui'

import Dropdown from './Dropdown'

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
    <div class="mt-1 shadow-inner shadow-zinc-900/25 bg-transparent  rounded border-zinc-700 outline-none">
      <Dropdown
        placeholder={placeholder}
        selected={getSelected}
        options={options}
        onSelected={onSelected}
        dropdownClass="border border-zinc-700"
      />
    </div>
  )
}

export default FormDropdown
