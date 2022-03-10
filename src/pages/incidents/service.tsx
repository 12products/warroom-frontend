import { Component, createEffect, createSignal } from 'solid-js'
import { useClient } from 'solid-urql'
import { useParams } from 'solid-app-router'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import IncidentsTable from '../../components/IncidentsTable'
import AppLayout from '../../components/layouts/AppLayout'
import { Incident } from '../../types'

const GET_INCIDENTS_BY_SERVICES = `
  query($id: ID!) {
    incidentsByServiceId(serviceId: $id) {
      id
      status
      title
      incidentDate
      severity
      tag
    }
  }
`

const fetchIncidentsByServiceId = async (serviceId: string) => {
  const client = useClient()
  const { data } = await client
    .query(GET_INCIDENTS_BY_SERVICES, { id: serviceId })
    .toPromise()

  return data.incidentsByServiceId
}

const Incidents: Component = () => {
  const params = useParams()
  const [getServiceId, setServiceId] = createSignal<string | null>(null)
  const [getIncidents, setIncidents] = createSignal<Incident[]>([])

  createEffect(async () => {
    if (params.id !== getServiceId()) {
      setIncidents(await fetchIncidentsByServiceId(params.id))
      setServiceId(params.id)
    }
  })

  const handleOnUpdate = ({ incident }: { incident?: Incident }) => {
    if (incident) {
      setIncidents([incident, ...getIncidents()])
    }
  }

  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <IncidentsTable
          incidents={getIncidents}
          handleOnUpdate={handleOnUpdate}
        />
      </main>
    </AppLayout>
  )
}

export default Incidents
