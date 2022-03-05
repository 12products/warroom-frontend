import { Component, Show } from 'solid-js'
import { useNavigate } from 'solid-app-router'
import { format } from 'date-fns'

import { Incident } from '../types/incident'
import { getIncidentSeverityIcon } from './IncidentSeverityIcons'

type Props = {
  incident: Incident
}

const IncidentRow: Component<Props> = ({ incident }) => {
  const navigate = useNavigate()
  const SeverityIcon = getIncidentSeverityIcon(incident.severity)

  return (
    <div
      class="flex justify-between items-center border-b last:border-b-0 border-zinc-700 hover:bg-zinc-800 hover:cursor-pointer p-4 first:rounder-t last:rounded-b"
      onClick={() => navigate(`/incidents/${incident.id}`)}
    >
      <div class="flex space-x-4">
        <div class="flex justify-center items-center">
          <SeverityIcon />
        </div>
        <div class="text-zinc-500">{incident.tag || incident.id}</div>
        <div>{incident.title}</div>
      </div>

      <div class="text-zinc-500">{`${format(
        new Date(incident.incidentDate),
        'MMM do, yyyy'
      )}`}</div>
    </div>
  )
}

export default IncidentRow
