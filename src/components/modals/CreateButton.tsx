import { Component } from 'solid-js'
import { FiPlus } from 'solid-icons/fi'

type Props = {
  handleOnClick: () => void
}

const CreateButton: Component<Props> = ({ handleOnClick }) => {
  return (
    <div
      class=" hover:text-zinc-300 hover:cursor-pointer text-zinc-500"
      onClick={handleOnClick}
    >
      <FiPlus size={16} />
    </div>
  )
}

export default CreateButton
