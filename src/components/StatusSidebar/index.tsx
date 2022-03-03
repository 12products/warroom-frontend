import { Component, For } from 'solid-js'

import { IncidentStatus } from '../../types/incident'
import IncidentsSidebarItem from './../IncidentsSidebarItem'

const statuses = [
  {
    text: 'Investigating',
    value: IncidentStatus.INVESTIGATING,
    route: 'status-investigating'
  },
  {
    text: 'Identified',
    value: IncidentStatus.IDENTIFIED,
    route: 'status-identified'
  },
  {
    text: 'Monitoring',
    value: IncidentStatus.MONITORING,
    route: 'status-monitoring'
  },
  {
    text: 'Resolved',
    value: IncidentStatus.RESOLVED,
    route: 'status-resolved'
  },
]

const StatusSidebar: Component = () => {
  return (
    <section class="space-y-1">
      <h3 class="px-2 py-1 text-zinc-500">Status</h3>

      <For each={statuses}>
        {(status) => (
          <IncidentsSidebarItem
            item={{
              title: status.text,
              route: `/incidents/${status.route}`,
            }}
          />
        )}
      </For>
    </section>
  )
}

export default StatusSidebar