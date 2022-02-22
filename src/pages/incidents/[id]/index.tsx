import { Component, Show } from 'solid-js'
import { useNavigate, useParams } from 'solid-app-router'
import { createQuery } from 'solid-urql'

import AppLayout from '../../../components/layouts/AppLayout'
import IncidentDetails from '../../../components/IncidentDetails'
import IncidentProperties from '../../../components/IncidentProperties'
import IncidentActionItems from '../../../components/IncidentActionItems'
import IncidentSummary from '../../../components/IncidentSummary'
import Button from '../../../components/Button'

const INCIDENT_QUERY = `
  query ($id: ID!) {
    incident(id: $id) {
      id
      title
      description
      incidentDate
      status
      severity
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
        createdAt
      }
    }
  }
`

const Incident: Component = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [incidentResult, incidentState] = createQuery({
    query: INCIDENT_QUERY,
    variables: { id: params.id },
  })
  const incident = () => incidentResult()?.incident

  return (
    <AppLayout>
      <Show when={!incidentState().fetching} fallback={<p>Loading...</p>}>
        <div class="grid grid-cols-4 gap-4">
          <div class="col-span-3 space-y-4">
            <IncidentSummary incident={incident} />
            <IncidentDetails incident={incident} />
          </div>

          <div class="space-y-4">
            <IncidentProperties incident={incident} />

            <Button
              buttonClass="w-full"
              onClick={() => navigate(`/incidents/${params.id}/room`)}
            >
              Create War Room
            </Button>

            <IncidentActionItems incident={incident} />
          </div>
        </div>
      </Show>
    </AppLayout>
  )
}

export default Incident
