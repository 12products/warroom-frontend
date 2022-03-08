import { Component } from 'solid-js'

import { DropdownOption as DropdownOptionType } from '../types'

type Props = {
  onClick: (id: string) => void
} & DropdownOptionType

const DropdownOption: Component<Props> = ({ id, label, onClick }) => {
  return (
    <div
      class="hover:bg-zinc-700 hover:text-white p-2 hover:cursor-pointer capitalize text-sm"
      onClick={() => onClick(id)}
    >
      {label.toLowerCase()}
    </div>
  )
}

export default DropdownOption
