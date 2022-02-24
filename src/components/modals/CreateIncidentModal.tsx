import { Accessor, Component, Setter, Show } from 'solid-js'

import CreateIncidentForm from '../forms/CreateIncidentForm'
import Modal from './Modal'

type Props = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
}
const CreateIncidentModal: Component<Props> = ({
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
