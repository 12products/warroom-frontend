import { Component } from 'solid-js'
import { format } from 'date-fns'

import { StatusMessage } from '../types/statusMessage'

type Props = {
  statusMessage: StatusMessage
}

const IncidentStatus: Component<Props> = ({ statusMessage }) => {
  return (
    <div class="border-b last:border-b-0 pb-8 last:pb-0 border-zinc-600 space-y-4">
      <header class="flex justify-between items-center">
        <h2 class="text-2xl font-bold capitalize">
          {statusMessage.status.toLowerCase()}
        </h2>

        <div class="text-zinc-500">
          {format(statusMessage.createdAt, 'MMM do, yyyy')}
        </div>
      </header>

      <p class="text-zinc-300">{statusMessage.text}</p>
    </div>
  )
}

export default IncidentStatus
