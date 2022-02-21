import { Accessor, Component, For } from 'solid-js'

import { StatusMessage } from '../types/statusMessage'
import IncidentStatus from './IncidentStatus'

const IncidentStatusesEmptyState: Component = () => {
  return (
    <div class="flex flex-col justify-center items-center h-full">
      <div class="text-zinc-500 mb-2">No status messages found</div>
      <div>Create one?</div>
    </div>
  )
}
type Props = {
  incident: Accessor<any>
}
const IncidentStatuses: Component<Props> = ({ incident }) => {
  return (
    <section class="text-sm p-8 space-y-8">
      <For
        each={incident()?.incident.statusMessage}
        fallback={<IncidentStatusesEmptyState />}
      >
        {(statusMessage) => (
          <IncidentStatus statusMessage={statusMessage as StatusMessage} />
        )}
      </For>
    </section>
  )
}

export default IncidentStatuses
