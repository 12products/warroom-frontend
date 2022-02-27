import { Component, Show } from 'solid-js'
import { CreateModalProps } from '../../types/ui'

import CreateStatusMessageForm from '../forms/CreateStatusMessageForm'
import Modal from './Modal'

const CreateStatusMessageModal: Component<CreateModalProps> = ({
  setShouldDisplay,
  getShouldDisplay,
}) => {
  const handleOnCreateStatusMessage = () => {
    setShouldDisplay(false)
  }
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <CreateStatusMessageForm
          onCreateStatusMessage={handleOnCreateStatusMessage}
        />
      </Modal>
    </Show>
  )
}

export default CreateStatusMessageModal
