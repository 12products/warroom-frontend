// @ts-nocheck
import { Component, createEffect, createSignal, Show } from 'solid-js'
import { useParams } from 'solid-app-router'
import { createQuery } from 'solid-urql'

import AppLayout from '../../../components/layouts/AppLayout'
import IncidentDetails from '../../../components/IncidentDetails'
import IncidentProperties from '../../../components/IncidentProperties'
import IncidentActionItems from '../../../components/IncidentActionItems'
import IncidentSummary from '../../../components/IncidentSummary'
import IncidentWarRoom from '../../../components/IncidentWarRoom'
import { Incident as IncidentType, IncidentUpdateProps } from '../../../types'

const INCIDENT_QUERY = `
  query ($id: ID!) {
    incident(id: $id) {
      id
      title
      description
      incidentDate
      status
      severity
      roomURL
      tag
      statusMessage {
        text
        status
        createdAt
      }
      assignee {
        id
        firstName
      }
      actionItems {
        text
      }
      events {
        text
        eventDate
      }
    }
    incidentEventTime(id: $id) {
      TTR
      TTD
    }
  }
`

const Incident: Component = () => {
  const params = useParams()
  const [incident, setIncident] = createSignal<IncidentType>()
  const [incidentResult, incidentState] = createQuery({
    query: INCIDENT_QUERY,
    variables: { id: params.id },
  })

  createEffect(() => {
    setIncident({
      ...incidentResult()?.incident,
      ...incidentResult()?.incidentEventTime,
    })
  })

  const handleOnUpdate = ({ event, statusMessage }: IncidentUpdateProps) => {
    if (incident()) {
      const prevIncident = incident() as IncidentType

      if (event) {
        prevIncident.events = [...incidentResult()?.incident.events, event]
      }

      console.log({ prevIncident })

      if (statusMessage) {
        prevIncident.statusMessage = [
          ...incidentResult()?.incident.statusMessage,
          statusMessage,
        ]
      }

      setIncident(prevIncident)
    }
  }

  return (
    <AppLayout>
      <Show when={incident()} fallback={<p>Loading...</p>}>
        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-3 space-y-4">
            <IncidentSummary incident={incident} />

            <IncidentDetails
              incident={incident}
              handleOnUpdate={handleOnUpdate}
            />
          </div>

          <div class="space-y-4">
            <IncidentProperties incident={incident} />

            <IncidentWarRoom roomURL={incident()?.roomURL} />
            <IncidentActionItems incident={incident} />
          </div>
        </div>
      </Show>
    </AppLayout>
  )
}

export default Incident
