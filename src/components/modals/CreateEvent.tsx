import { Component, Show } from 'solid-js'

import CreateEventForm from '../forms/CreateEventForm'
import Modal from './Modal'
import { CreateModalProps } from '../../types/ui'

const CreateEventModal: Component<CreateModalProps> = ({
  setShouldDisplay,
  getShouldDisplay,
}) => {
  const handleOnCreateEvent = () => {
    setShouldDisplay(false)
  }
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <CreateEventForm onCreateEvent={handleOnCreateEvent} />
      </Modal>
    </Show>
  )
}

export default CreateEventModal
