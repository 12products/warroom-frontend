import { Component, createSignal } from 'solid-js'
import CreateButton from './CreateButton'
import CreateStatusMessageModal from './CreateStatusMessage'

const CreateStatusMessageButton: Component = () => {
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
      />
    </>
  )
}

export default CreateStatusMessageButton
