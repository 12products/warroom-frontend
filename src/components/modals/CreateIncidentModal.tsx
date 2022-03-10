import { Component, Show } from 'solid-js'
import { CreateModalProps, HandleOnUpdateProps, Incident } from '../../types'

import CreateIncidentForm from '../forms/CreateIncidentForm'
import Modal from './Modal'

const CreateIncidentModal: Component<
  CreateModalProps & HandleOnUpdateProps
> = ({ setShouldDisplay, getShouldDisplay, handleOnUpdate }) => {
  const handleOnCreateIncident = (incident: Incident) => {
    setShouldDisplay(false)
    handleOnUpdate({ incident })
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
