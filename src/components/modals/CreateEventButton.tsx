import { Component, createSignal } from 'solid-js'

import CreateButton from './CreateButton'
import CreateEventModal from './CreateEvent'

const CreateEventButton: Component = () => {
  const [getShouldDisplayEvent, setShouldDisplayEvent] = createSignal(false)
  const handleCreateEvent = () => {
    setShouldDisplayEvent(true)
  }
  return (
    <>
      <CreateButton handleOnClick={handleCreateEvent} hasBackground />
      <CreateEventModal
        getShouldDisplay={getShouldDisplayEvent}
        setShouldDisplay={setShouldDisplayEvent}
      />
    </>
  )
}

export default CreateEventButton
