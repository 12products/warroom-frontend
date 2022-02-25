import { Component, Show } from 'solid-js'

import CreateActionItemForm from '../forms/CreateActionItemForm'
import Modal from './Modal'
import { ModalProps } from '../../types/ui'

const CreateActionItemModal: Component<ModalProps> = ({
  setShouldDisplay,
  getShouldDisplay,
}) => {
  const handleOnCreateActionItem = () => {
    setShouldDisplay(false)
  }

  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <CreateActionItemForm onCreateActionItem={handleOnCreateActionItem} />
      </Modal>
    </Show>
  )
}

export default CreateActionItemModal
