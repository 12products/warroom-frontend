import { format } from 'date-fns'
import { Component, For } from 'solid-js'

import { IncidentStatus as IncidentStatusType } from '../types/Incident'
import { StatusMessage } from '../types/statusMessage'
import IncidentStatus from './IncidentStatus'

const STATUSES = [
  {
    id: '1',
    text: "Globular star cluster a still more glorious dawn awaits consciousness billions upon billions Orion's sword worldlets? A mote of dust suspended in a sunbeam with pretty stories for which there's little good evidence take root and flourish star stuff harvesting star light hundreds of thousands how far away. The carbon in our apple pies not a sunrise but a galaxyrise as a patch of light as a patch of light concept of the number one extraordinary claims require extraordinary evidence and billions upon billions upon billions upon billions upon billions upon billions upon billions.",
    status: IncidentStatusType.RESOLVED,
    createdAt: new Date('2022-02-19'),
  },
  {
    id: '2',
    text: "Decipherment Vangelis great turbulent clouds light years finite but unbounded concept of the number one. Two ghostly white figures in coveralls and helmets are softly dancing bits of moving fluff a mote of dust suspended in a sunbeam the sky calls to us brain is the seed of intelligence white dwarf? Extraordinary claims require extraordinary evidence the only home we've ever known invent the universe two ghostly white figures in coveralls and helmets are softly dancing not a sunrise but a galaxyrise something incredible is waiting to be known and billions upon billions upon billions upon billions upon billions upon billions upon billions.",
    status: IncidentStatusType.INVESTIGATING,
    createdAt: new Date('2022-02-18'),
  },
] as StatusMessage[]

const IncidentStatusesEmptyState: Component = () => {
  return (
    <div class="flex flex-col justify-center items-center h-full">
      <div class="text-zinc-500 mb-2">No status messages found</div>
      <div>Create one?</div>
    </div>
  )
}

const IncidentStatuses: Component = () => {
  return (
    <section class="text-sm p-8 space-y-8 border border-t-0 border-zinc-700 rounded-b">
      <For each={STATUSES} fallback={<IncidentStatusesEmptyState />}>
        {(statusMessage) => <IncidentStatus statusMessage={statusMessage} />}
      </For>
    </section>
  )
}

export default IncidentStatuses
