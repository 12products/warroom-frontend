import { Component } from 'solid-js'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import AppLayout from '../../components/layouts/AppLayout'
import { Incident, IncidentSeverity } from '../../types/incident'
import IncidentsTable from '../../components/IncidentsTable'
import { createQuery } from 'solid-urql'

const GET_ASSIGNED_INCIDENTS = `
  query {
    assignedIncidents {
      id
      description
      status
      title
      incidentDate
      severity
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
