import { Component } from 'solid-js'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import AppLayout from '../../components/layouts/AppLayout'
import { Incident, IncidentSeverity } from '../../types/incident'
import IncidentsTable from '../../components/IncidentsTable'

const INCIDENTS = [
  {
    id: 'BAT-1',
    title: 'Incident 1',
    incidentDate: new Date(),
    severity: IncidentSeverity.HIGH,
  },
  {
    id: 'BAT-2',
    title: 'Incident 2',
    incidentDate: new Date(),
    severity: IncidentSeverity.MEDIUM,
  },
  {
    id: 'BAT-3',
    title: 'Incident 3',
    incidentDate: new Date(),
    severity: IncidentSeverity.CRITICAL,
  },
  {
    id: 'BAT-4',
    title: 'Incident 4',
    incidentDate: new Date(),
    severity: IncidentSeverity.LOW,
  },
] as Incident[]

const AssignedIncidents: Component = () => {
  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <IncidentsTable incidents={INCIDENTS} />
      </main>
    </AppLayout>
  )
}

export default AssignedIncidents
