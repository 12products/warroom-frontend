import { Component } from 'solid-js'

import IncidentProperty from './IncidentProperty'

const IncidentProperties: Component = () => {
  return (
    <section class="bg-zinc-800 border border-zinc-700 rounded p-4 text-sm shadow shadow-zinc-900/50">
      <IncidentProperty
        label="Satus"
        selected="investigating"
        options={[{ id: 'investigating', label: 'Investigating' }]}
      />

      <IncidentProperty
        label="Severity"
        selected="critical"
        options={[
          { id: 'critical', label: 'Critical' },
          { id: 'high', label: 'High' },
          { id: 'medium', label: 'Medium' },
          { id: 'Low', label: 'Low' },
        ]}
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
