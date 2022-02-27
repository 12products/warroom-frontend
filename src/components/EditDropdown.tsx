import { Accessor, Component, For, createSignal, Show } from 'solid-js'
import { BsThreeDots } from 'solid-icons/bs'

import DropdownOption from './DropdownOption'
import onClickOutside from '../directives/onClickOutside'
import { getUseDirectives } from '../utils/directives'

type Props = {
  onSelected: (id: string) => void
}

const OPTIONS = [
  { id: 'edit', label: 'edit' },
  { id: 'delete', label: 'delete' },
]

const EditDropdown: Component<Props> = ({ onSelected }) => {
  const [getDropdownDisplay, setDropdownDisplay] = createSignal(false)

  const handleOptionClick = (option: string) => {
    onSelected(option)
    setDropdownDisplay(false)
  }

  return (
    <div
      onClick={() => setDropdownDisplay(true)}
      ref={getUseDirectives([onClickOutside, () => setDropdownDisplay(false)])}
    >
      <BsThreeDots size={24} />

      <Show when={getDropdownDisplay()}>
        <div class="bg-zinc-800 border border-zinc-400 border-opacity-25 z-10 mt-1 rounded shadow-lg shadow-zinc-900/50 absolute right-4 w-fit">
          <For each={OPTIONS}>
            {(item) => <DropdownOption onClick={handleOptionClick} {...item} />}
          </For>
        </div>
      </Show>
    </div>
  )
}

export default EditDropdown
