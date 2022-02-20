import { Component } from 'solid-js'
import { FiPlus } from 'solid-icons/fi'
import { useNavigate } from 'solid-app-router'
import classnames from 'classnames'

const CreateServiceButton: Component = () => {
  const navigate = useNavigate()

  return (
    <div
      class={classnames([
        'bg-zinc-800 border border-zinc-700 rounded h-32 flex flex-col justify-center items-center text-zinc-400 shadow shadow-zinc-900/50',
        'hover:cursor-pointer hover:bg-opacity-75 hover:shadow-lg',
      ])}
      onClick={() => navigate('/services/create')}
    >
      <FiPlus size={24} />
      <div class="text-sm">Create Service</div>
    </div>
  )
}

export default CreateServiceButton
