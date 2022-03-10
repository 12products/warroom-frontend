import { Component } from 'solid-js'
import classnames from 'classnames'

import { useField } from '../lib/form'

type Props = {
  ref?: any
  name: string
  label: string
  type?: string
  inputClass?: string
}

const Input: Component<Props> = ({
  ref,
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
        ref={ref}
        class={classnames([
          'mt-1 shadow-inner shadow-zinc-900/25 bg-transparent border border-zinc-700 outline-none rounded p-2 text-sm',
          'focus:border-green-400 focus:ring-1 focus:ring-green-800 focus:ring-offset-green-400',
          inputClass,
        ])}
        name={name}
        type={type}
        // @ts-ignore
        use:formHandler
      />

      <span class="text-xs text-red-500 mt-1">{field.error()}</span>
    </div>
  )
}

export default Input
