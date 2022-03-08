import { Component, createSignal } from 'solid-js'

import { HandleOnUpdateProps } from '../../types'
import CreateButton from './CreateButton'
import CreateStatusMessageModal from './CreateStatusMessage'

const CreateStatusMessageButton: Component<HandleOnUpdateProps> = ({
  handleOnUpdate,
}) => {
  const [getShouldDisplayStatusMessage, setShouldDisplayStatusMessage] =
    createSignal(false)

  const handleCreateStatusMessage = () => {
    setShouldDisplayStatusMessage(true)
  }

  return (
    <>
      <CreateButton handleOnClick={handleCreateStatusMessage} hasBackground />
      <CreateStatusMessageModal
        getShouldDisplay={getShouldDisplayStatusMessage}
        setShouldDisplay={setShouldDisplayStatusMessage}
        handleOnUpdate={handleOnUpdate}
      />
    </>
  )
}

export default CreateStatusMessageButton
