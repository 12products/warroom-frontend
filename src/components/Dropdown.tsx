import { Component, createSignal, Show, For, Accessor } from 'solid-js'
import classnames from 'classnames'

import { DropdownOption as DropdownOptionType } from '../types/ui'
import DropdownOption from './DropdownOption'
import onClickOutside from '../directives/onClickOutside'
import { getUseDirectives } from '../utils/directives'
import { getOption } from '../utils/getOption'

type Props = {
  placeholder: string | null
  options: DropdownOptionType[]
  selected: Accessor<string | null>
  onSelected: (optionLabel: DropdownOptionType | null) => void
}

const Dropdown: Component<Props> = ({
  placeholder,
  options,
  selected,
  onSelected,
}) => {
  const [getShouldDisplayOptions, setShouldDisplayOptions] = createSignal(false)

  const handleSelectOption = (id: string) => {
    onSelected(getOption(id, options) || null)
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
          'border border-transparent hover:border-zinc-400 hover:border-opacity-25 p-2 rounded hover:cursor-pointer capitalize',
          {
            'border-zinc-400 border-opacity-25': getShouldDisplayOptions(),
          }
        )}
        onClick={() => setShouldDisplayOptions(!getShouldDisplayOptions())}
      >
        <Show when={selected()} fallback={<>{placeholder}</>}>
          {selected()?.toLowerCase()}
        </Show>
      </div>

      <Show when={getShouldDisplayOptions()}>
        <div class="absolute bg-zinc-800 border border-zinc-400 border-opacity-25 z-10 w-full mt-1 rounded shadow-lg shadow-zinc-900/50">
          <For each={options}>
            {(item) => (
              <DropdownOption onClick={handleSelectOption} {...item} />
            )}
          </For>
        </div>
      </Show>
    </div>
  )
}

export default Dropdown
