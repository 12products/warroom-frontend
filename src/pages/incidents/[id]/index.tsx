import { Accessor, Component, createEffect, Show } from 'solid-js'
import { useParams, useRouteData } from 'solid-app-router'

import AppLayout from '../../../components/layouts/AppLayout'
import IncidentDetails from '../../../components/IncidentDetails'
import IncidentProperties from '../../../components/IncidentProperties'
import IncidentActionItems from '../../../components/IncidentActionItems'
import IncidentSummary from '../../../components/IncidentSummary'
import { createQuery } from 'solid-urql'

const INCIDENT_QUERY = `
  query ($id: ID!) {
    incident(id: $id) {
      id
      title
      description
      incidentDate
      statusMessage {
        text
        status
        createdAt
      }
    }
  }
`

const Incident: Component = () => {
  const params = useParams()
  const [incident, incidentState] = createQuery({
    query: INCIDENT_QUERY,
    variables: { id: params.id },
  })
  return (
    <AppLayout>
      <Show when={!incidentState().fetching} fallback={<p>Loading...</p>}>
        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-3 space-y-4">
            <IncidentSummary incident={incident} />
            <IncidentDetails incident={incident} />
          </div>

          <div class="space-y-4">
            <IncidentProperties />
            <IncidentActionItems />
          </div>
        </div>
      </Show>
    </AppLayout>
  )
}

export default Incident
