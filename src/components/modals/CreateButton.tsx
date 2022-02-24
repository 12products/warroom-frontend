import { Component } from 'solid-js'
import { FiPlus } from 'solid-icons/fi'
import classnames from 'classnames'

export type ButtonModalProps = {
  handleOnClick: () => void
  hasBackground?: boolean
}

const CreateButton: Component<ButtonModalProps> = ({
  handleOnClick,
  hasBackground = false,
}) => {
  return (
    <div
      class={classnames(
        'hover:cursor-pointer',
        {
          'w-6 h-6 bg-zinc-700 shadow border border-zinc-600 rounded flex justify-center items-center hover:bg-opacity-75 text-zinc-300':
            hasBackground,
        },
        {
          ' hover:text-zinc-300 hover:cursor-pointer text-zinc-500':
            !hasBackground,
        }
      )}
      onClick={handleOnClick}
    >
      <FiPlus size={16} />
    </div>
  )
}

export default CreateButton
