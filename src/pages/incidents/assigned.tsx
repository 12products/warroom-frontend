import { Component } from 'solid-js'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import AppLayout from '../../components/layouts/AppLayout'
import IncidentsTable from '../../components/IncidentsTable'
import { createQuery } from 'solid-urql'

const GET_ASSIGNED_INCIDENTS = `
  query {
    assignedIncidents {
      id
      status
      title
      incidentDate
      severity
      tag
    }
  }
`

const AssignedIncidents: Component = () => {
  const [assignedIncidentsResult] = createQuery({
    query: GET_ASSIGNED_INCIDENTS,
  })

  const incidents = () => assignedIncidentsResult()?.assignedIncidents

  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <IncidentsTable incidents={incidents} />
      </main>
    </AppLayout>
  )
}

export default AssignedIncidents
