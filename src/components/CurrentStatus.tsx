import {
  Component,
  Show,
  For,
  createSignal,
  createEffect,
  Accessor,
} from 'solid-js'
import { isToday } from 'date-fns'

import { Incident } from '../types/incident'
import { getIncidentStyles } from '../utils/incidents'
import { getIncidentSeverityIcon } from './IncidentSeverityIcons'

type Props = {
  incidents: Accessor<Incident[]>
}

const CurrentStatus: Component<Props> = ({ incidents }) => {
  const [getHasLoadedTodaysIncidents, setHasLoadedTodaysIncidents] =
    createSignal(false)
  const [getTodaysIncidents, setTodaysIncidents] = createSignal<Incident[]>([])

  createEffect(() => {
    if (incidents()?.length && !getHasLoadedTodaysIncidents()) {
      setTodaysIncidents(
        incidents()?.filter((incident) =>
          isToday(new Date(incident.incidentDate))
        )
      )
      setHasLoadedTodaysIncidents(true)
    }
  })

  return (
    <div class="w-1/2 mx-auto">
      <Show when={!getTodaysIncidents()?.length}>
        <div>All systems go!</div>
      </Show>

      <For each={getTodaysIncidents()}>
        {(incident) => {
          const [incidentBackgroundColor, incidentBorderColor] =
            getIncidentStyles(incident.severity)
          return (
            <div
              class={`${incidentBackgroundColor} ${incidentBorderColor} border bg-opacity-50 p-8 rounded shadow shadow-zinc-900`}
            >
              <div class="font-semibold text-xl mb-1">
                {incident.service.name}
              </div>

              <div class="font-semibold">{incident.title}</div>
              <div class="text-sm">{incident.description}</div>
            </div>
          )
        }}
      </For>
    </div>
  )
}

export default CurrentStatus
