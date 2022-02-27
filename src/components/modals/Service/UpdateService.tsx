import { Accessor, Component, Setter, Show } from 'solid-js'
import { Service } from '../../../types/service'
import UpdateServiceForm from '../../forms/Service/UpdateService'
import Modal from '../Modal'

type Props = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
  service: Service
}

const UpdateService: Component<Props> = ({
  setShouldDisplay,
  getShouldDisplay,
  service,
}) => {
  const onUpdateService = () => {
    setShouldDisplay(false)
  }
  return (
    <Show when={getShouldDisplay()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <UpdateServiceForm
          service={service}
          onUpdateService={onUpdateService}
        />
      </Modal>
    </Show>
  )
}

export default UpdateService
