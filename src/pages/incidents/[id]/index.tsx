import { Component } from 'solid-js'

import AppLayout from '../../../components/layouts/AppLayout'
import IncidentDetails from '../../../components/IncidentDetails'
import IncidentProperties from '../../../components/IncidentProperties'
import IncidentActionItems from '../../../components/IncidentActionItems'
import IncidentSummary from '../../../components/IncidentSummary'

const Incident: Component = () => {
  return (
    <AppLayout>
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-3 space-y-4">
          <IncidentSummary />
          <IncidentDetails />
        </div>

        <div class="space-y-4">
          <IncidentProperties />

          <IncidentActionItems />
        </div>
      </div>
    </AppLayout>
  )
}

export default Incident
