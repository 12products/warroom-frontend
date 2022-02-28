import { Component } from 'solid-js'

import AppLayout from '../../components/layouts/AppLayout'
import IncidentsTable from '../../components/IncidentsTable'
import IncidentsSidebar from '../../components/IncidentsSidebar'
import { createQuery } from 'solid-urql'

const GET_OPEN_INCIDENTS = `
  query {
    openIncidents {
      id
      description
      status
      title
      incidentDate
      severity
    }
  }
`
const OpenIncidents: Component = () => {
  const [incidentsByOpenResult] = createQuery({
    query: GET_OPEN_INCIDENTS,
  })

  const incidents = () => incidentsByOpenResult()?.openIncidents

  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <IncidentsTable incidents={incidents} />
      </main>
    </AppLayout>
  )
}

export default OpenIncidents
