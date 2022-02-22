import { Component, createSignal, Show } from 'solid-js'

import Button from './Button'
import WarRoomModal from './modals/WarRoomModal'

type Props = {
  roomURL?: string
}

const IncidentWarRoom: Component<Props> = ({ roomURL = '' }) => {
  const [getShouldDisplay, setShouldDisplay] = createSignal(false)

  return (
    <>
      <Button buttonClass="w-full" onClick={() => setShouldDisplay(true)}>
        {roomURL ? 'Join' : 'Create'} War Room
      </Button>

      <Show when={getShouldDisplay()}>
        <WarRoomModal
          getShouldDisplay={getShouldDisplay}
          setShouldDisplay={setShouldDisplay}
        />
      </Show>
    </>
  )
}

export default IncidentWarRoom
