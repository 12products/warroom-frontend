import { Accessor, Component } from 'solid-js'
import { useRouteData } from 'solid-app-router'
import { Incident } from '../types/incident'

type Props = {
  incident: Accessor<any>
}

const IncidentSummary: Component<Props> = ({ incident }) => {
  return (
    <section class="border border-zinc-700 rounded p-8 space-y-4 shadow shadow-zinc-900/50">
      <div class="flex justify-between">
        <div>
          <label class="text-sm text-zinc-500">BAT-66</label>
          <h1 class="text-2xl font-bold">{incident()?.incident.title}</h1>
        </div>

        <div class="text-sm">
          <div class="grid gap-4 grid-cols-3">
            <div class="text-zinc-500">TTD</div>
            <div class="col-span-2">10 minutes</div>
          </div>

          <div class="grid gap-4 grid-cols-3">
            <div class="text-zinc-500">TTR</div>
            <div class="col-span-2">12 minutes</div>
          </div>
        </div>
      </div>

      <p class="text-zinc-300 text-sm">{incident()?.incident.description}</p>
    </section>
  )
}

export default IncidentSummary
