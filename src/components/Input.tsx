import { Component } from 'solid-js'
import { useField, Form } from 'solid-js-form'

type Props = {
  name: string
  label: string
  type?: string
  labelClass?: string
  inputClass?: string
}

const Input: Component<Props> = ({
  name,
  label,
  type = 'text',
  labelClass = '',
  inputClass = '',
}) => {
  const { field, form } = useField(name)
  const formHandler = form.formHandler

  return (
    <div class="flex flex-col">
      <label for={name} class={`text-sm ${labelClass}`}>
        {label}
      </label>

      <input
        id={name}
        class={`mt-1 rounded text-zinc-900 p-2 ${inputClass}`}
        name={name}
        // @ts-ignore
        value={field.value()}
        type={type}
        use:formHandler
      />

      <span class="text-xs text-red-500 mt-1">{field.error()}</span>
    </div>
  )
}

export default Input
