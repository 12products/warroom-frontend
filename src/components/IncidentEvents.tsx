import { Accessor, Component, For } from 'solid-js'

import { Event } from '../types/event'
import { Incident } from '../types/incident'
import IncidentEvent from './IncidentEvent'

type Props = {
  incident: Accessor<Incident>
}

const IncidentEventsEmptyState: Component = () => {
  return (
    <div class="flex flex-col justify-center items-center h-full">
      <div class="text-zinc-500 mb-2">No events found</div>
      <div>Add one?</div>
    </div>
  )
}

const IncidentEvents: Component<Props> = ({ incident }) => {
  return (
    <section class="text-sm p-8 space-y-8">
      <For each={incident().events} fallback={<IncidentEventsEmptyState />}>
        {(event: Event) => <IncidentEvent event={event} />}
      </For>
    </section>
  )
}

export default IncidentEvents
