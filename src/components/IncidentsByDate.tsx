import { Component, For } from 'solid-js'
import { format } from 'date-fns'
import { Link } from 'solid-app-router'

import { Incident } from '../types/incident'
import { getIncidentSeverityIcon } from './IncidentSeverityIcons'

type Props = {
  date: string
  incidents: Incident[]
}

const IncidentsByDate: Component<Props> = ({ date, incidents }) => {
  return (
    <div class="pb-8 border-b last:pb-0 last:border-0 border-zinc-700">
      <div class="text-sm text-zinc-400 mb-4">
        {format(new Date(date), 'MMM dd, yyyy')}
      </div>

      <div class="space-y-4">
        <For
          each={incidents}
          fallback={<div class="text-zinc-400">No incidents reported</div>}
        >
          {({ id, title, description, severity, service }) => {
            const SeverityIcon = getIncidentSeverityIcon(severity)
            return (
              <div>
                <div class="text-xs font-semibold text-zinc-400 mb-1">
                  {service.name}
                </div>

                <div class="flex items-center justify-between mb-1">
                  <Link href={`/incidents/${id}`}>{title}</Link>
                  <SeverityIcon />
                </div>

                <div class="text-xs text-zinc-300">{description}</div>
              </div>
            )
          }}
        </For>
      </div>
    </div>
  )
}

export default IncidentsByDate
