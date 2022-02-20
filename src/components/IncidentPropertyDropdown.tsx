import { Component, createSignal, Show, For } from 'solid-js'
import classnames from 'classnames'

import { IncidentPropertyOption } from '../types/Incident'
import IncidentPropertyDropdownOption from './IncidentPropertyDropdownOption'
import onClickOutside from '../directives/onClickOutside'
import { getUseDirectives } from '../utils/directives'

type Props = {
  label: string
  options: IncidentPropertyOption[]
  selected: string | null
}

const IncidentPropertyDropdown: Component<Props> = ({
  label,
  options,
  selected = null,
}) => {
  const getOption = (id: string) => options.find((option) => option.id === id)
  const [getSelected, setSelected] = createSignal(
    selected ? getOption(selected)?.label : null
  )
  const [getShouldDisplayOptions, setShouldDisplayOptions] = createSignal(false)

  const handleSelectOption = (id: string) => {
    setSelected(getOption(id)?.label)
    setShouldDisplayOptions(false)
  }

  return (
    <div class="relative">
      <div
        ref={getUseDirectives([
          onClickOutside,
          () => setShouldDisplayOptions(false),
        ])}
        class={classnames(
          'border border-transparent hover:border-zinc-400 hover:border-opacity-25 p-2 rounded hover:cursor-pointer',
          {
            'border-zinc-400 border-opacity-25': getShouldDisplayOptions(),
          }
        )}
        onClick={() => setShouldDisplayOptions(!getShouldDisplayOptions())}
      >
        <Show
          when={getSelected()}
          fallback={<>Select {label.toLowerCase()}...</>}
        >
          {getSelected()}
        </Show>
      </div>

      <Show when={getShouldDisplayOptions()}>
        <div class="absolute bg-zinc-800 border border-zinc-400 border-opacity-25 z-10 w-full mt-1 rounded shadow-lg shadow-zinc-900/50">
          <For each={options}>
            {(item) => (
              <IncidentPropertyDropdownOption
                onClick={handleSelectOption}
                {...item}
              />
            )}
          </For>
        </div>
      </Show>
    </div>
  )
}

export default IncidentPropertyDropdown
