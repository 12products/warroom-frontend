import { Accessor, Component, For } from 'solid-js'
import { format } from 'date-fns'

import { Event } from '../types/event'
import IncidentEvent from './IncidentEvent'
import { incidentSeverityOptions } from '../types/incident'

// const EVENTS = [
//   {
//     id: '1',
//     text: 'Science billions upon billions radio telescope rogue circumnavigated Tunguska event.',
//     date: new Date('2021-01-01'),
//   },
//   {
//     id: '2',
//     text: 'Light years colonies a still more glorious dawn awaits emerged into consciousness another world great turbulent clouds.',
//     date: new Date('2021-01-05'),
//   },
//   {
//     id: '3',
//     text: 'Citizens of distant epochs a very small stage in a vast cosmic arena shores of the cosmic ocean the carbon in our apple pies a mote of dust suspended in a sunbeam concept of the number one.',
//     date: new Date('2021-01-06'),
//   },
//   {
//     id: '4',
//     text: "Muse about the only home we've ever known stirred by starlight extraordinary claims require extraordinary evidence tendrils of gossamer clouds stirred by starlight and billions upon billions upon billions upon billions upon billions upon billions upon billions.",
//     date: new Date('2021-01-06'),
//   },
//   {
//     id: '5',
//     text: 'Vastness is bearable only through love inconspicuous motes of rock and gas a very small stage in a vast cosmic arena extraordinary claims require extraordinary evidence decipherment rich in heavy atoms?',
//     date: new Date('2021-01-07'),
//   },
// ] as Event[]
type Props = {
  incident: Accessor<any>
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
