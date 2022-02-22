import { Accessor, Component, For } from 'solid-js'

import {
  Incident,
  IncidentActionItem as IncidentActionItemType,
} from '../types/incident'
import IncidentActionItem from './IncidentActionItem'

type Props = {
  incident: Accessor<Incident>
}
const IncidentActionItems: Component<Props> = ({ incident }) => {
  return (
    <section class="p-4 pt-0 text-sm">
      <h2 class="text-zinc-500 mb-2">Action Items</h2>

      <ul class="space-y-2">
        <For each={incident()?.actionItems}>
          {(actionItem: IncidentActionItemType) => (
            <li>
              <IncidentActionItem actionItem={actionItem} />
            </li>
          )}
        </For>
      </ul>
    </section>
  )
}

export default IncidentActionItems
