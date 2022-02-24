import { Component, For } from 'solid-js'
import { format } from 'date-fns'
import { Link } from 'solid-app-router'

import { Incident } from '../types/incident'

type Props = {
  date: string
  incidents: Incident[]
}

const DateIncidents: Component<Props> = ({ date, incidents }) => {
  return (
    <div class="pb-8 border-b last:pb-0 last:border-0 border-zinc-700">
      <div class="text-sm text-zinc-400 mb-4">
        {format(new Date(date), 'MMM dd, yyyy')}
      </div>

      <div>
        <For each={incidents} fallback={'No incidents reported'}>
          {({ id, title }) => (
            <Link href={`/incidents/${id}`}>
              <div>{title}</div>
            </Link>
          )}
        </For>
      </div>
    </div>
  )
}

export default DateIncidents
