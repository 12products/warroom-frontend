import { Accessor, Component, createSignal, Show } from 'solid-js'
import { useField } from 'solid-js-form'
import { DropdownOption } from '../types'

import Dropdown from './Dropdown'

type Props = {
  options: Accessor<DropdownOption[]>
  field: string
  placeholder: string
  label?: string
}

const FormDropdown: Component<Props> = ({
  options,
  field,
  placeholder,
  label,
}) => {
  const [getSelected, setSelected] = createSignal<string | null>(null)
  const { form } = useField(field)

  const onSelected = (option: DropdownOption) => {
    setSelected(option?.label || null)
    option && form.setValue(field, option.id)
  }

  return (
    <div>
      <Show when={label}>
        <label class="text-sm text-zinc-500">{label}</label>
      </Show>

      <div class="mt-1 shadow-inner shadow-zinc-900/25 bg-transparent  rounded border-zinc-700 outline-none">
        <Dropdown
          placeholder={placeholder}
          selected={getSelected}
          options={options}
          onSelected={onSelected}
        />
      </div>
    </div>
  )
}

export default FormDropdown
