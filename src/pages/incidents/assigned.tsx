import { Component, createEffect, createSignal } from 'solid-js'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import AppLayout from '../../components/layouts/AppLayout'
import IncidentsTable from '../../components/IncidentsTable'
import { createQuery } from 'solid-urql'
import { Incident } from '../../types'

const GET_ASSIGNED_INCIDENTS = `
  query {
    assignedIncidents {
      id
      status
      tag
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

  const [getIncidents, setIncidents] = createSignal<Incident[]>([])

  createEffect(() => {
    setIncidents(assignedIncidentsResult()?.assignedIncidents)
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

export default AssignedIncidents
