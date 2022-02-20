import { Component } from 'solid-js'

import { IncidentActionItem as IncidentActionItemType } from '../types/incident'

type Props = {
  actionItem: IncidentActionItemType
}

const IncidentActionItem: Component<Props> = ({ actionItem: { id, text } }) => {
  return (
    <div class="flex items-center space-x-2">
      <input
        class="text-green-500 shadow-lg rounded focus:ring-1 focus:ring-green-800 focus:ring-offset-green-400 border-0"
        type="checkbox"
        id={id}
        value={text}
      />
      <label for={id}>{text}</label>
    </div>
  )
}

export default IncidentActionItem
