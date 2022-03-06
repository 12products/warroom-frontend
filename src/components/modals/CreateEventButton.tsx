import { Component, createSignal } from 'solid-js'
import { HandleOnUpdateProps } from '../../types'

import CreateButton from './CreateButton'
import CreateEventModal from './CreateEvent'

const CreateEventButton: Component<HandleOnUpdateProps> = ({
  handleOnUpdate,
}) => {
  const [getShouldDisplayEvent, setShouldDisplayEvent] = createSignal(false)
  const handleCreateEvent = () => {
    setShouldDisplayEvent(true)
  }

  return (
    <>
      <CreateButton handleOnClick={handleCreateEvent} hasBackground />
      <CreateEventModal
        handleOnUpdate={handleOnUpdate}
        getShouldDisplay={getShouldDisplayEvent}
        setShouldDisplay={setShouldDisplayEvent}
      />
    </>
  )
}

export default CreateEventButton
