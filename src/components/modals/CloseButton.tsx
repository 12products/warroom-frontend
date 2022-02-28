import { IoClose } from 'solid-icons/io'
import { Component } from 'solid-js'

import { ModalProps } from '../../types/ui'

const CloseButton: Component<ModalProps> = ({ setShouldDisplay }) => {
  return (
    <div
      class="absolute top-2 right-2 flex justify-center items-center hover:cursor-pointer text-zinc-300 hover:text-zinc-400"
      onClick={() => setShouldDisplay(false)}
    >
      <IoClose size={18} />
    </div>
  )
}

export default CloseButton
