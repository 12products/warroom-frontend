import { Component } from 'solid-js'

import { IncidentActionItem as IncidentActionItemType } from '../types/incident'

type Props = {
  actionItem: IncidentActionItemType
}

const IncidentActionItem: Component<Props> = ({ actionItem: { id, text } }) => {
  return (
    <div class="flex items-center space-x-2">
      <input
        class="text-green-500 rounded"
        type="checkbox"
        id={id}
        value={text}
      />
      <label for={id}>{text}</label>
    </div>
  )
}

export default IncidentActionItem
