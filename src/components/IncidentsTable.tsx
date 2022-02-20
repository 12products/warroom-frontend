import { Component, For } from 'solid-js'

import { Incident } from '../types/Incident'
import IncidentRow from './IncidentRow'

type Props = {
  incidents: Incident[]
}

const IncidentsTableEmptyState: Component = () => {
  return (
    <div class="flex flex-col justify-center items-center h-full">
      <div class="text-zinc-500 mb-2">No incidents found</div>
      <div>Create one?</div>
    </div>
  )
}

const IncidentsTable: Component<Props> = ({ incidents }) => {
  return (
    <section class="col-span-3 border border-zinc-700 rounded text-sm text-zinc-300">
      <For each={incidents} fallback={<IncidentsTableEmptyState />}>
        {(incident) => <IncidentRow incident={incident} />}
      </For>
    </section>
  )
}

export default IncidentsTable
