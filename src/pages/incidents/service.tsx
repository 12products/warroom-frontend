import { Component } from 'solid-js'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import IncidentsTable from '../../components/IncidentsTable'
import AppLayout from '../../components/layouts/AppLayout'

const Incidents: Component = () => {
  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        {/* <IncidentsTable incidents={[]} /> */}
      </main>
    </AppLayout>
  )
}

export default Incidents
