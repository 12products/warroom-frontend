import { Component, Show } from 'solid-js'

import CreateEventForm from '../forms/CreateEventForm'
import Modal from './Modal'
import { CreateModalProps, HandleOnUpdateProps, Event } from '../../types'

type Props = CreateModalProps & HandleOnUpdateProps
const CreateEventModal: Component<Props> = ({
  setShouldDisplay,
  getShouldDisplay,
  handleOnUpdate,
}) => {
  const handleOnCreateEvent = () => {
    setShouldDisplay(false)
  }
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <CreateEventForm
          onCreateEvent={handleOnCreateEvent}
          handleOnUpdate={handleOnUpdate}
        />
      </Modal>
    </Show>
  )
}

export default CreateEventModal
