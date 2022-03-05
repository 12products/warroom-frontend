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
import { useParams } from 'solid-app-router'

import { Organization } from '../types/organization'
import { Service } from '../types/service'
import ServiceStatus from '../components/ServiceStatus'
import { Incident } from '../types/incident'
import IncidentsByDate from '../components/IncidentsByDate'
import CurrentStatus from '../components/CurrentStatus'

const GET_SERVICES = `
  query($id: ID!) {
    organizationStatus(id: $id) {
      id
      name
      services {
        id
        name
        description
        incidents {
          id
          title
          incidentDate
          severity
          description
        }
      }
    }
  }
`

type IncidentsByDateType = {
  [key: string]: { date: string; incidents: Incident[] }
}

const Status: Component = () => {
  const params = useParams()
  const [statusResult] = createQuery({
    query: GET_SERVICES,
    variables: { id: params.id },
  })
  const organization: Accessor<Organization | null> = () =>
    statusResult()?.organizationStatus
      ? {
          id: statusResult()?.organizationStatus.id,
          name: statusResult()?.organizationStatus.name,
        }
      : null
  const services: Accessor<Service[]> = () =>
    statusResult()?.organizationStatus?.services
  // Create a flap map of incidents but ensure they also have service data
  const incidents: Accessor<Incident[]> = () =>
    services()?.flatMap((service) =>
      service.incidents.map((incident) => ({
        ...incident,
        service: {
          ...service,
        },
      }))
    )
  const [incidentsByDate, setIncidentsByDate] =
    createSignal<IncidentsByDateType>({})

  createEffect(() => {
    // Create data structure containing incidents
    // for the past 15 days grouped by date
    if (incidents()?.length && !Object.values(incidentsByDate()).length) {
      const incidentsByDate: IncidentsByDateType = {}
      for (let i = 0; i < 14; i++) {
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
    <div class="space-y-8 py-8">
      <header class="w-1/2 mx-auto text-center text-4xl">
        {organization()?.name}
      </header>

      <CurrentStatus incidents={incidents} />

      <section class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900 w-1/2 mx-auto relative space-y-8">
        <Show when={services()?.length} fallback={<div>Loading...</div>}>
          <For each={services()}>
            {(service) => <ServiceStatus service={service} />}
          </For>
        </Show>
      </section>

      <section class="border border-zinc-700 rounded p-8 shadow shadow-zinc-900 w-1/2 mx-auto relative space-y-8">
        <For each={Object.values(incidentsByDate())}>
          {({ date, incidents }) => (
            <IncidentsByDate date={date} incidents={incidents} />
          )}
        </For>
      </section>
    </div>
  )
}

export default Status
