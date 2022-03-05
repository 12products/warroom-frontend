import { Accessor, Component, createSignal, For } from 'solid-js'

import {
  Incident,
  IncidentActionItem as IncidentActionItemType,
} from '../types'
import IncidentActionItem from './IncidentActionItem'
import CreateActionItemModal from './modals/CreateActionItemModal'
import CreateButton from './modals/CreateButton'

type Props = {
  incident: Accessor<Incident | undefined>
}

const IncidentActionItems: Component<Props> = ({ incident }) => {
  const [getShouldDisplay, setShouldDisplay] = createSignal(false)
  const handleOnClick = () => {
    setShouldDisplay(true)
  }

  return (
    <section class="p-4 pt-0 text-sm">
      <div class="flex justify-between items-center">
        <h2 class="text-zinc-500 mb-2">Action Items</h2>
        <CreateButton handleOnClick={handleOnClick} />
      </div>

      <ul class="space-y-2">
        <For each={incident()?.actionItems}>
          {(actionItem: IncidentActionItemType) => (
            <li>
              <IncidentActionItem actionItem={actionItem} />
            </li>
          )}
        </For>
      </ul>
      <CreateActionItemModal
        getShouldDisplay={getShouldDisplay}
        setShouldDisplay={setShouldDisplay}
      />
    </section>
  )
}

export default IncidentActionItems
