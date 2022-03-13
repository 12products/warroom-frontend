import { Component, createEffect, createSignal } from 'solid-js'

import AppLayout from '../../components/layouts/AppLayout'
import IncidentsTable from '../../components/IncidentsTable'
import IncidentsSidebar from '../../components/IncidentsSidebar'
import { createQuery } from 'solid-urql'
import { Incident } from '../../types'

const GET_OPEN_INCIDENTS = `
  query {
    openIncidents {
      id
      status
      title
      incidentDate
      severity
      tag
    }
  }
`

const OpenIncidents: Component = () => {
  const [incidentsByOpenResult] = createQuery({
    query: GET_OPEN_INCIDENTS,
  })

  const [getIncidents, setIncidents] = createSignal<Incident[]>([])

  createEffect(() => {
    setIncidents(incidentsByOpenResult()?.openIncidents)
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

export default OpenIncidents
