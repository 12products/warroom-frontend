import { Component } from 'solid-js'
import { useField } from 'solid-js-form'

type Props = {
  name: string
  label: string
  type?: string
  inputClass?: string
}

const Input: Component<Props> = ({
  name,
  label,
  type = 'text',
  inputClass = '',
}) => {
  const { field, form } = useField(name)
  const formHandler = form.formHandler

  return (
    <div class="input flex flex-col">
      <label for={name} class="text-sm text-zinc-500">
        {label}
      </label>

      <input
        id={name}
        class={`mt-1 shadow-inner shadow-zinc-900/25 bg-transparent border border-zinc-700 outline-none focus:border-green-400 focus:ring-1 focus:ring-green-800 focus:ring-offset-green-400 rounded p-2 ${inputClass}`}
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
