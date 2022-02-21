import { Component } from 'solid-js'

import AppLayout from '../../components/layouts/AppLayout'
import IncidentsTable from '../../components/IncidentsTable'
import IncidentsSidebar from '../../components/IncidentsSidebar'

const OpenIncidents: Component = () => {
  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        {/* <IncidentsTable incidents={[]} /> */}
      </main>
    </AppLayout>
  )
}

export default OpenIncidents
