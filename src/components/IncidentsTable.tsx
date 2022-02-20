import { Component, For } from 'solid-js'
import { useNavigate } from 'solid-app-router'

import { Incident } from '../types/incident'
import Button from './Button'
import IncidentRow from './IncidentRow'

type Props = {
  incidents: Incident[]
}

const IncidentsTableEmptyState: Component = () => {
  const navigate = useNavigate()
  const handleCreateIncident = () => {
    navigate('/incidents/create')
  }
  return (
    <div class="flex flex-col justify-center items-center h-52">
      <div class="text-zinc-500 mb-2">No incidents found</div>
      <Button onClick={handleCreateIncident}>Create one?</Button>
    </div>
  )
}

const IncidentsTable: Component<Props> = ({ incidents }) => {
  return (
    <div class="col-span-3 ">
      <section class="border border-zinc-700 rounded text-sm text-zinc-300 shadow shadow-zinc-900/50">
        <For each={incidents} fallback={<IncidentsTableEmptyState />}>
          {(incident) => <IncidentRow incident={incident} />}
        </For>
      </section>
    </div>
  )
}

export default IncidentsTable
