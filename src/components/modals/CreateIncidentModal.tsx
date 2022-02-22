import { Accessor, Component, Setter, Show } from 'solid-js'
import CreateIncidentForm from '../CreateIncidentForm'
import Modal from './Modal'

type Props = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
}
const CreateIncidentModal: Component<Props> = ({
  setShouldDisplay,
  getShouldDisplay,
}) => {
  return (
    <Show when={getShouldDisplay()}>
      <Modal
        getShouldDisplay={getShouldDisplay}
        setShouldDisplay={setShouldDisplay}
      >
        <CreateIncidentForm />
      </Modal>
    </Show>
  )
}

export default CreateIncidentModal
