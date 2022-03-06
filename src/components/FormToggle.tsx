import {
  Accessor,
  Component,
  createEffect,
  createSignal,
  Match,
  Switch,
} from 'solid-js'
import { useField } from 'solid-js-form'
import classnames from 'classnames'

type Props = {
  field: string
  label: string
  value: Accessor<boolean>
  onSelected: (selected: boolean) => void
}

const FormToggle: Component<Props> = ({ field, label, value, onSelected }) => {
  const { form } = useField(field)

  const handleToggle = () => {
    form.setValue(field, !value())
    onSelected(!value())
  }

  return (
    <div class="space-y-2 text-zinc-500 text-sm">
      <div class="hover:cursor-pointer" onClick={handleToggle}>
        {label}
      </div>

      <div
        onClick={handleToggle}
        class="hover:cursor-pointer rounded-full w-10 bg-zinc-700 border border-zinc-400 border-opacity-25 flex relative"
      >
        <div
          style={{ 'margin-left': value() ? '1.07rem' : '0' }}
          class={classnames([
            'rounded-full h-5 w-5 transition-all ease-in-out duration-300',
            {
              'bg-green-500': value(),
              'bg-zinc-800': !value(),
            },
          ])}
        ></div>
      </div>
    </div>
  )
}

export default FormToggle
