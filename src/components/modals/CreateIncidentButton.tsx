import { Component, createSignal } from 'solid-js'
import Button from '../Button'
import CreateIncidentModal from './CreateIncidentModal'

const CreateIncidentButton: Component = () => {
  const [getShouldDisplay, setShouldDisplay] = createSignal(false)
  return (
    <div>
      <Button onClick={() => setShouldDisplay(true)} buttonClass="w-full">
        Create Incident
      </Button>
      <CreateIncidentModal
        getShouldDisplay={getShouldDisplay}
        setShouldDisplay={setShouldDisplay}
      />
    </div>
  )
}

export default CreateIncidentButton
