import { Component, For } from 'solid-js'
import { sub, format } from 'date-fns'
import classnames from 'classnames'

import { Service } from '../types/service'
import { IncidentSeverity } from '../types/incident'
import { getHigherSeverity } from '../utils/incidents'

type Props = {
  service: Service
}

type DateRange = {
  [key: string]: { date: string; incident: IncidentSeverity | null }
}

const ServiceStatus: Component<Props> = ({ service }) => {
  // Create an object of the past 60 days so we can
  // visualize whether or not a service had an incident
  const dateRange: DateRange = {}
  for (let i = 59; i > 0; i--) {
    const date = format(sub(new Date(), { days: i }), 'MM-dd-yyyy')
    dateRange[date] = { date, incident: null }
  }

  for (const { incidentDate, severity } of service.incidents) {
    const date = format(new Date(incidentDate), 'MM-dd-yyyy')
    if (dateRange[date]) {
      dateRange[date].incident = getHigherSeverity(
        severity,
        dateRange[date].incident
      )
    }
  }

  return (
    <div class="pb-8 border-b last:pb-0 last:border-0 border-zinc-700">
      <div class="text-zinc-400 mb-2">{service.name}</div>
      <div class="flex justify-between">
        <For each={Object.values(dateRange)}>
          {(date) => (
            <div
              class={classnames('h-8 w-1 rounded', {
                'bg-red-500':
                  date.incident === IncidentSeverity.CRITICAL ||
                  date.incident === IncidentSeverity.HIGH,
                'bg-yellow-500':
                  date.incident === IncidentSeverity.MEDIUM ||
                  date.incident === IncidentSeverity.LOW,
                'bg-green-600': !date.incident,
              })}
            ></div>
          )}
        </For>
      </div>
    </div>
  )
}

export default ServiceStatus
