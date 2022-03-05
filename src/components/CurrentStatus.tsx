import { Component, Show, For, Accessor } from 'solid-js'

import { Incident, IncidentStatus } from '../types/incident'
import { getIncidentStyles } from '../utils/incidents'
import { getIncidentSeverityIcon } from './IncidentSeverityIcons'

type Props = {
  incidents: Accessor<Incident[]>
}

type OpenIncidentsByService = {
  [key: string]: { name: string; incidents: Incident[] }
}

const CurrentStatus: Component<Props> = ({ incidents }) => {
  const openIncidents = () =>
    incidents()?.filter(({ status }) => status !== IncidentStatus.RESOLVED) ||
    []
  const openIncidentsByService = () => {
    const services: OpenIncidentsByService = {}

    openIncidents().forEach((incident) => {
      if (!services[incident.service.id]) {
        services[incident.service.id] = {
          name: incident.service.name,
          incidents: [incident],
        }
      } else {
        services[incident.service.id].incidents.push(incident)
      }
    })

    return services
  }

  return (
    <div class="w-1/2 mx-auto">
      <Show when={!openIncidents()?.length}>
        <div>All systems go!</div>
      </Show>

      <div class="space-y-4">
        <For each={Object.values(openIncidentsByService())}>
          {({ name, incidents }) => (
            <div>
              <div class="font-semibold text-xl mb-1 text-zinc-300">{name}</div>

              <div class="space-y-2">
                <For each={incidents}>
                  {(incident) => {
                    const [incidentBackgroundColor, incidentBorderColor] =
                      getIncidentStyles(incident.severity)
                    return (
                      <div
                        class={`${incidentBackgroundColor} ${incidentBorderColor} border bg-opacity-50 p-4 rounded shadow shadow-zinc-900`}
                      >
                        <div class="font-semibold">{incident.title}</div>
                        <div class="text-sm">{incident.description}</div>
                      </div>
                    )
                  }}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

export default CurrentStatus
