import { Component, createSignal, Match, Switch } from 'solid-js'
import { useField } from 'solid-js-form'
import classnames from 'classnames'

type Props = {
  field: string
  label: string
  value: boolean
}

const FormDropdown: Component<Props> = ({ field, label, value }) => {
  const { form } = useField(field)
  const [getSelected, setSelected] = createSignal(value)

  const handleToggle = () => {
    form.setValue(field, !getSelected())
    setSelected(!getSelected())
  }

  return (
    <div
      class="hover:cursor-pointer space-y-2 text-zinc-500 text-sm"
      onClick={handleToggle}
    >
      <div>{label}</div>
      <div class="rounded-full w-10 bg-zinc-700 border border-zinc-400 border-opacity-25 flex relative">
        <div
          style={{ 'margin-left': getSelected() ? '1.07rem' : '0' }}
          class={classnames([
            'rounded-full h-5 w-5 transition-all ease-in-out duration-300',
            {
              'bg-green-500': getSelected(),
              'bg-zinc-800': !getSelected(),
            },
          ])}
        ></div>
      </div>
    </div>
  )
}

export default FormDropdown
