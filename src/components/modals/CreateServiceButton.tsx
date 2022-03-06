import { Component, createSignal } from 'solid-js'
import { FiPlus } from 'solid-icons/fi'
import classnames from 'classnames'

import CreateServiceModal from '../modals/CreateServiceModal'

const CreateServiceButton: Component = () => {
  const [getShouldDisplayServiceForm, setShouldDisplayServiceForm] =
    createSignal(false)

  const handleCreateService = () => {
    setShouldDisplayServiceForm(true)
  }

  return (
    <>
      <div
        class={classnames([
          'border border-zinc-700 rounded h-32 flex flex-col justify-center items-center text-zinc-400 shadow shadow-zinc-900/50',
          'hover:cursor-pointer hover:bg-opacity-75 hover:shadow-lg',
        ])}
        onClick={handleCreateService}
      >
        <FiPlus size={24} />
        <div class="text-sm">Create Service</div>
      </div>

      <CreateServiceModal
        setShouldDisplay={setShouldDisplayServiceForm}
        getShouldDisplay={getShouldDisplayServiceForm}
      />
    </>
  )
}

export default CreateServiceButton
