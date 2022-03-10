import { Component, createEffect, createSignal } from 'solid-js'
import { useClient } from 'solid-urql'
import { useParams } from 'solid-app-router'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import IncidentsTable from '../../components/IncidentsTable'
import AppLayout from '../../components/layouts/AppLayout'
import { IncidentStatus } from '../../types/incident'

const GET_INCIDENTS_BY_STATUS = `
  query($status: String!) {
    incidentsByStatus(status: $status) {
      id
      description
      status
      title
      incidentDate
      severity
    }
  }
`

const fetchIncidentsByStatus = async (serviceId: string) => {
  const client = useClient()
  const { data } = await client
    .query(GET_INCIDENTS_BY_STATUS, { status: serviceId })
    .toPromise()

  return data?.incidentsByStatus
}

const IncidentsIdentified: Component = () => {
  const [getIncidents, setIncidents] = createSignal([])

  createEffect(async () => {
    setIncidents(await fetchIncidentsByStatus(IncidentStatus.IDENTIFIED))
  })

  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <IncidentsTable incidents={getIncidents} />
      </main>
    </AppLayout>
  )
}

export default IncidentsIdentified
