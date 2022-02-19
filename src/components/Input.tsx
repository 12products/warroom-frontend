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
      <label for={name} class="text-sm text-zinc-400 opacity-80">
        {label}
      </label>

      <input
        id={name}
        class={`mt-1 bg-transparent border border-zinc-400 border-opacity-80 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-400 focus:ring-opacity-25 rounded p-2 ${inputClass}`}
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
