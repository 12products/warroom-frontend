import { Component, Show } from 'solid-js'
import { createQuery } from 'solid-urql'

import AppLayout from '../../components/layouts/AppLayout'
import IncidentsSidebar from '../../components/IncidentsSidebar'
import IncidentsTable from '../../components/IncidentsTable'

const GET_INCIDENTS = `
  query {
    incidents {
      id
      title
      incidentDate
      severity
    }
  }
`

const Incidents: Component = () => {
  const [incidentsResult, incidentsState] = createQuery({
    query: GET_INCIDENTS,
  })
  console.log(incidentsResult()?.incidents)

  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <Show
          when={!incidentsState().fetching}
          fallback={<IncidentsTable incidents={[]} />}
        >
          <IncidentsTable incidents={incidentsResult().incidents} />
        </Show>
      </main>
    </AppLayout>
  )
}

export default Incidents
