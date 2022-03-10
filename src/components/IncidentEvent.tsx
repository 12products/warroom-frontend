import { Component } from 'solid-js'
import { format } from 'date-fns'

import { Event } from '../types'

type Props = {
  event: Event
}

const IncidentEvent: Component<Props> = ({ event }) => {
  console.log({ event })
  return (
    <div class="grid grid-cols-4 gap-4 border-b last:border-b-0 pb-8 last:pb-0 border-zinc-600">
      <div class="col-span-1 grid grid-cols-2 gap-1 text-zinc-400">
        <span>{format(new Date(event.eventDate), 'MMM d yyyy')}</span>
        <span>{format(new Date(event.eventDate), 'HH:mm:ss')}</span>
      </div>

      <div class="col-span-3 text-zinc-300">{event.text}</div>
    </div>
  )
}

export default IncidentEvent
