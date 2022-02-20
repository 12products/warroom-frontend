import { Component } from 'solid-js'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import IncidentsTable from '../../components/IncidentsTable'
import AppLayout from '../../components/layouts/AppLayout'
import { Show } from 'solid-js'
import { createQuery } from 'solid-urql'

const Incidents: Component = () => {
  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <IncidentsTable incidents={[]} />
      </main>
    </AppLayout>
  )
}

export default Incidents
