import { Component, Show } from 'solid-js'

import CreateServiceForm from '../forms/CreateServiceForm'
import Modal from './Modal'
import { CreateModalProps } from '../../types/ui'

const CreateServiceModal: Component<CreateModalProps> = ({
  setShouldDisplay,
  getShouldDisplay,
}) => {
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <CreateServiceForm />
      </Modal>
    </Show>
  )
}

export default CreateServiceModal
