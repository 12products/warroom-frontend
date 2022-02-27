import { Component, Show } from 'solid-js'
import { CreateModalProps } from '../../types/ui'

import CreateIncidentForm from '../forms/CreateIncidentForm'
import Modal from './Modal'

const CreateIncidentModal: Component<CreateModalProps> = ({
  setShouldDisplay,
  getShouldDisplay,
}) => {
  const handleOnCreateIncident = () => {
    setShouldDisplay(false)
  }
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <CreateIncidentForm onCreateIncident={handleOnCreateIncident} />
      </Modal>
    </Show>
  )
}

export default CreateIncidentModal
