import {
  Component,
  Show,
  For,
  Accessor,
  createSignal,
  createEffect,
} from 'solid-js'
import { createQuery } from 'solid-urql'
import { sub, format } from 'date-fns'

import AppLayout from '../components/layouts/AppLayout'
import { Service } from '../types/service'
import ServiceStatus from '../components/ServiceStatus'
import { Incident } from '../types/incident'
import DateIncidents from '../components/DateIncidents'

const GET_SERVICES = `
  query {
    services {
      id
      name
      description
      incidents {
        id
        title
        incidentDate
        severity
      }
    }
  }
`

type IncidentsByDate = {
  [key: string]: { date: string; incidents: Incident[] }
}

const Status: Component = () => {
  const [servicesResult] = createQuery({
    query: GET_SERVICES,
  })
  const services: Accessor<Service[]> = () => servicesResult()?.services
  const incidents: Accessor<Incident[]> = () =>
    services()?.flatMap((service) => service.incidents)
  const [getIncidentsByDate, setIncidentsByDate] =
    createSignal<IncidentsByDate>({})

  createEffect(() => {
    if (incidents()?.length && !Object.values(getIncidentsByDate()).length) {
      // Create an object of the past 60 days so we can
      // visualize whether or not a service had an incident
      const incidentsByDate: IncidentsByDate = {}
      for (let i = 0; i < 59; i++) {
        const date = format(sub(new Date(), { days: i }), 'MM-dd-yyyy')
        incidentsByDate[date] = { date, incidents: [] }
      }

      incidents()?.forEach((incident) => {
        const date = format(new Date(incident.incidentDate), 'MM-dd-yyyy')
        if (incidentsByDate[date]) {
          incidentsByDate[date].incidents.push(incident)
        }
      })

      setIncidentsByDate(incidentsByDate)
    }
  })

  return (
    <AppLayout>
      <div class="space-y-8">
        <div class="w-1/2 mx-auto text-center">All systems go!</div>

        <div class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900 w-1/2 mx-auto relative space-y-8">
          <Show when={services()?.length} fallback={<div>Loading...</div>}>
            <For each={services()}>
              {(service) => <ServiceStatus service={service} />}
            </For>
          </Show>
        </div>

        <div class="border border-zinc-700 rounded p-8 shadow shadow-zinc-900 w-1/2 mx-auto relative space-y-8">
          <For each={Object.values(getIncidentsByDate())}>
            {({ date, incidents }) => (
              <DateIncidents date={date} incidents={incidents} />
            )}
          </For>
        </div>
      </div>
    </AppLayout>
  )
}

export default Status
