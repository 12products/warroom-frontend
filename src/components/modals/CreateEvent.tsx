import { Component, Show } from 'solid-js'

import CreateEventForm from '../forms/CreateEventForm'
import Modal from './Modal'
import { CreateModalProps, HandleOnUpdateProps, Event } from '../../types'

type ArgProps = {
  event?: Event
}
type Props = CreateModalProps & {
  handleOnUpdate: (args?: HandleOnUpdateProps) => void
}
const CreateEventModal: Component<Props> = ({
  setShouldDisplay,
  getShouldDisplay,
  reexecuteQuery,
}) => {
  const handleOnCreateEvent = () => {
    setShouldDisplay(false)
  }
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <CreateEventForm
          onCreateEvent={handleOnCreateEvent}
          reexecuteQuery={reexecuteQuery}
        />
      </Modal>
    </Show>
  )
}

export default CreateEventModal
