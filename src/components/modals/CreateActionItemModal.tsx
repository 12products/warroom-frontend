import { Accessor, Component, Setter, Show } from 'solid-js'
import CreateActionItemForm from '../forms/CreateActionItemForm'
import Modal from './Modal'

type Props = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
}
const CreateActionItemModal: Component<Props> = ({
  setShouldDisplay,
  getShouldDisplay,
}) => {
  const handleOnCreateActionItem = () => {
    setShouldDisplay(false)
  }

  return (
    <Show when={getShouldDisplay()}>
      <Modal
        getShouldDisplay={getShouldDisplay}
        setShouldDisplay={setShouldDisplay}
      >
        <CreateActionItemForm onCreateActionItem={handleOnCreateActionItem} />
      </Modal>
    </Show>
  )
}

export default CreateActionItemModal
