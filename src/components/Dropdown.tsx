import { Component, createSignal, Show, For, Accessor } from 'solid-js'
import classnames from 'classnames'

import { DropdownOption as DropdownOptionType } from '../types/ui'
import DropdownOption from './DropdownOption'
import onClickOutside from '../directives/onClickOutside'
import { getUseDirectives } from '../utils/directives'
import { getOption } from '../utils/getOption'

type Props = {
  placeholder: string | null
  options: Accessor<DropdownOptionType[]>
  selected: Accessor<string | null>
  onSelected: (optionLabel: DropdownOptionType) => void
  dropdownClass?: string
}

const Dropdown: Component<Props> = ({
  placeholder,
  options,
  selected,
  onSelected,
  dropdownClass = '',
}) => {
  const [getShouldDisplayOptions, setShouldDisplayOptions] = createSignal(false)

  const handleSelectOption = (id: string) => {
    const newSelectedOption = getOption(id, options())
    newSelectedOption && onSelected(newSelectedOption)
    setShouldDisplayOptions(false)
  }

  return (
    <div class="relative text-sm">
      <div
        ref={getUseDirectives([
          onClickOutside,
          () => setShouldDisplayOptions(false),
        ])}
        class={classnames(
          'p-2 rounded hover:cursor-pointer capitalize border border-zinc-700 hover:border-green-500',
          {
            'border-green-500': getShouldDisplayOptions(),
          },
          dropdownClass
        )}
        onClick={() => setShouldDisplayOptions(!getShouldDisplayOptions())}
      >
        <Show
          when={selected()}
          fallback={<span class="text-zinc-600">{placeholder}</span>}
        >
          {selected()?.toLowerCase()}
        </Show>
      </div>

      <Show when={getShouldDisplayOptions()}>
        <div class="absolute bg-zinc-800 border border-zinc-400 border-opacity-25 z-10 w-full mt-1 rounded shadow-lg shadow-zinc-900/50">
          <For each={options()}>
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
