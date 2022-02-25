import { IoClose } from 'solid-icons/io'
import { Component } from 'solid-js'

import { ModalProps } from '../../types/ui'

const CloseButton: Component<ModalProps> = ({ setShouldDisplay }) => {
  return (
    <div
      class="absolute inset-y-4 right-8"
      onClick={() => setShouldDisplay(false)}
    >
      <div class="w-6 h-6 bg-zinc-700 shadow border border-zinc-600 rounded flex justify-center items-center hover:bg-opacity-75 hover:cursor-pointer text-zinc-300">
        <IoClose size={16} />
      </div>
    </div>
  )
}

export default CloseButton
