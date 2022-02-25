import { Component, createEffect, For } from 'solid-js'
import { sub, format } from 'date-fns'
import classnames from 'classnames'

import { Service } from '../types/service'
import { IncidentSeverity } from '../types/incident'
import { getHigherSeverity, getIncidentStyles } from '../utils/incidents'

type Props = {
  service: Service
}

type DateRange = {
  [key: string]: { date: string; incidentSeverity: IncidentSeverity | null }
}

const ServiceStatus: Component<Props> = ({ service }) => {
  // Create an object of the past 60 days so we can
  // visualize whether or not a service had an incident
  const dateRange: DateRange = {}
  for (let i = 59; i >= 0; i--) {
    const date = format(sub(new Date(), { days: i }), 'MM-dd-yyyy')
    dateRange[date] = { date, incidentSeverity: null }
  }

  for (const { incidentDate, severity } of service.incidents) {
    const date = format(new Date(incidentDate), 'MM-dd-yyyy')
    if (dateRange[date]) {
      dateRange[date].incidentSeverity = getHigherSeverity(
        severity,
        dateRange[date].incidentSeverity
      )
    }
  }

  return (
    <div class="pb-8 border-b last:pb-0 last:border-0 border-zinc-700">
      <div class="text-zinc-400 mb-2">{service.name}</div>
      <div class="flex justify-between">
        <For each={Object.values(dateRange)}>
          {(date) => {
            const [incidentBackgroundColor] = getIncidentStyles(
              date.incidentSeverity
            )
            return (
              <div
                class={classnames('h-8 w-1 rounded', incidentBackgroundColor)}
              />
            )
          }}
        </For>
      </div>
    </div>
  )
}

export default ServiceStatus
