import { Component } from 'solid-js'
import classnames from 'classnames'
import { useNavigate } from 'solid-app-router'

import { Service } from '../types/service'
import { getServiceStatusIcon } from './ServiceStatusIcons'

type Props = {
  service: Service
}

const ServiceCard: Component<Props> = ({ service }) => {
  const StatusIcon = getServiceStatusIcon(service.status)
  const navigate = useNavigate()

  return (
    <div
      class={classnames([
        'bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900/50 h-32 flex flex-col justify-between',
        'hover:cursor-pointer hover:bg-opacity-75 hover:shadow-lg',
      ])}
      onClick={() => navigate(`/incidents/service/${service.id}`)}
    >
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold">{service.name}</h2>
        <StatusIcon />
      </div>

      <p class="text-zinc-300 text-sm">{service.description}</p>
    </div>
  )
}

export default ServiceCard
