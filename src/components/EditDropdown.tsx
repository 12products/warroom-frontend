import { Accessor, Component, For, Show } from 'solid-js'
import DropdownOption from './DropdownOption'
import { DropdownOption as DropdownOptionType } from '../types/ui'
import { AcceptedPlugin } from 'postcss'

type Props = {
  options: Accessor<DropdownOptionType[]>
  selected: Accessor<string | null>
  onSelected: (id: string) => void
}

const EditDropdown: Component<Props> = ({ options, onSelected }) => {
  return (
    <div class="bg-zinc-800 border border-zinc-400 border-opacity-25 z-10 w-full mt-1 rounded shadow-lg shadow-zinc-900/50">
      <For each={options()}>
        {(item) => <DropdownOption onClick={onSelected} {...item} />}
      </For>
    </div>
  )
}

export default EditDropdown
