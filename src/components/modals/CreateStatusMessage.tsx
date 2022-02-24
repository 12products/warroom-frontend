import { Accessor, Component, Setter, Show } from 'solid-js'
import CreateStatusMessageForm from '../forms/CreateStatusMessageForm'
import Modal from './Modal'

type Props = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
}
const CreateStatusMessageModal: Component<Props> = ({
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
