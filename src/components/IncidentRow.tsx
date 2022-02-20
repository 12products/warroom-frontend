import { Component } from 'solid-js'
import { useNavigate } from 'solid-app-router'
import { format } from 'date-fns'

import { Incident } from '../types/Incident'
import { getIncidentSeverityIcon } from './IncidentSeverityIcons'

type Props = {
  incident: Incident
}

const IncidentRow: Component<Props> = ({ incident }) => {
  const navigate = useNavigate()
  const SeverityIcon = getIncidentSeverityIcon(incident.severity)

  return (
    <div
      class="flex justify-between items-center border-b last:border-b-0 border-zinc-700 hover:bg-zinc-800 hover:cursor-pointer px-4 py-2"
      onClick={() => navigate(`/incidents/${incident.id}`)}
    >
      <div class="flex space-x-4">
        <div class="flex justify-center items-center">
          <SeverityIcon />
        </div>
        <div class="text-zinc-500">{incident.id}</div>
        <div>{incident.title}</div>
      </div>

      <div class="text-zinc-500">{`${format(
        incident.date,
        'MMM do, yyyy'
      )}`}</div>
    </div>
  )
}

export default IncidentRow
