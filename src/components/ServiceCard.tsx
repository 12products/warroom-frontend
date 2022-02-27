import { Component, createSignal, Show } from 'solid-js'
import classnames from 'classnames'
import { useNavigate } from 'solid-app-router'
import { BsThreeDots } from 'solid-icons/bs'

import { createMutation } from 'solid-urql'

import { Service } from '../types/service'
import { getServiceStatusIcon } from './ServiceStatusIcons'
import EditDropdown from './EditDropDown'
import UpdateService from './modals/Service/UpdateService'

const DELETE_SERVICE = `
  mutation($id: ID!) {
    removeService(id: $id){
      id
    }
  }
`
type Props = {
  service: Service
}

const ServiceCard: Component<Props> = ({ service }) => {
  const StatusIcon = getServiceStatusIcon(service.status)
  const navigate = useNavigate()

  const [getDisplayEditModal, setDisplayEditModal] = createSignal(false)
  const [_getSelected, setSelected] = createSignal<string | null>(null)
  const [_, deleteService] = createMutation(DELETE_SERVICE)

  const handleSelectedAction = (optionId: string) => {
    setSelected(optionId || null)

    if (optionId === 'delete') {
      deleteService({ id: service.id })
    }
    if (optionId === 'edit') {
      setDisplayEditModal(true)
    }
  }

  return (
    <>
      <UpdateService
        setShouldDisplay={setDisplayEditModal}
        getShouldDisplay={getDisplayEditModal}
        service={service}
      />
      <div
        class={classnames([
          'bg-zinc-800 border border-zinc-700 rounded p-4 shadow shadow-zinc-900/50 flex flex-col justify-between relative',
          'hover:cursor-pointer hover:bg-opacity-75 hover:shadow-lg',
        ])}
      >
        <div class="flex justify-between items-center">
          <StatusIcon />

          <EditDropdown onSelected={handleSelectedAction} />
        </div>

        <div onClick={() => navigate(`/incidents/service/${service.id}`)}>
          <h2 class="text-2xl font-bold mt-4">{service.name}</h2>

          <p class="text-zinc-300 text-sm">{service.description}</p>
        </div>
      </div>
    </>
  )
}

export default ServiceCard
