import { Component, Show } from 'solid-js'
import { CreateModalProps, HandleOnUpdateProps } from '../../types'

import CreateStatusMessageForm from '../forms/CreateStatusMessageForm'
import Modal from './Modal'

const CreateStatusMessageModal: Component<
  CreateModalProps & HandleOnUpdateProps
> = ({ setShouldDisplay, getShouldDisplay, handleOnUpdate }) => {
  const handleOnCreateStatusMessage = () => {
    setShouldDisplay(false)
  }
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <CreateStatusMessageForm
          onCreateStatusMessage={handleOnCreateStatusMessage}
          handleOnUpdate={handleOnUpdate}
        />
      </Modal>
    </Show>
  )
}

export default CreateStatusMessageModal
