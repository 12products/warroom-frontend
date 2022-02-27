import { Accessor, Component, Setter, Show } from 'solid-js'
import UpdateServiceForm from '../../forms/Service/UpdateService'
import Modal from '../Modal'

type Props = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
  id: string
}

const UpdateService: Component<Props> = ({
  setShouldDisplay,
  getShouldDisplay,
  id,
}) => {
  const onUpdateService = () => {
    setShouldDisplay(false)
  }
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <UpdateServiceForm serviceId={id} onUpdateService={onUpdateService} />
      </Modal>
    </Show>
  )
}

export default UpdateService
