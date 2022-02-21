import { Accessor, Component } from 'solid-js'

import IncidentProperty from './IncidentProperty'
import {
  incidentStatusOptions,
  incidentSeverityOptions,
} from '../types/Incident'

type Props = {
  incident: Accessor<any>
}

const IncidentProperties: Component<Props> = ({ incident }) => {
  return (
    <section class="bg-zinc-800 border border-zinc-700 rounded p-4 text-sm shadow shadow-zinc-900/50">
      <IncidentProperty
        label="Status"
        selected={incident()?.incident.status}
        options={incidentStatusOptions}
      />

      <IncidentProperty
        label="Severity"
        selected={incident()?.incident.severity}
        options={incidentSeverityOptions}
      />

      <IncidentProperty
        label="Assigned"
        selected="amorriscode"
        options={[{ id: 'amorriscode', label: '@amorriscode' }]}
      />
    </section>
  )
}

export default IncidentProperties
