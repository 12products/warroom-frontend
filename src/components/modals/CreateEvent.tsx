import { Accessor, Component, Setter, Show } from 'solid-js'
import CreateEventForm from '../forms/CreateEventForm'
import Modal from './Modal'

type Props = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
}

const CreateEventModal: Component<Props> = ({
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
