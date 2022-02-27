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
  const [getDropdownDisplay, setDropdownDisplay] = createSignal(false)
  const [getDisplayEditModal, setDisplayEditModal] = createSignal(false)
  const [getSelected, setSelected] = createSignal<string | null>(null)
  const [deleteServiceResult, deleteService] = createMutation(DELETE_SERVICE)
  const handleOnClick = () => {
    setDropdownDisplay(true)
  }

  const onSelected = (optionId: string) => {
    setSelected(optionId || null)

    if (optionId === 'delete') {
      deleteService({ id: service.id })
    }
    if (optionId === 'edit') {
      setDisplayEditModal(true)
    }
    setDropdownDisplay(false)
  }

  return (
    <>
      <UpdateService
        id={service.id}
        setShouldDisplay={setDisplayEditModal}
        getShouldDisplay={getDisplayEditModal}
      />
      <div
        class={classnames([
          'bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900/50 h-32 flex flex-col justify-between relative',
          'hover:cursor-pointer hover:bg-opacity-75 hover:shadow-lg',
        ])}
      >
        <div class="absolute top-2 right-12" onClick={handleOnClick}>
          <BsThreeDots size={24} />
          <Show when={getDropdownDisplay()}>
            <EditDropdown
              options={() => [
                { id: 'edit', label: 'edit' },
                { id: 'delete', label: 'delete' },
              ]}
              selected={getSelected}
              onSelected={onSelected}
            />
          </Show>
        </div>

        <div onClick={() => navigate(`/incidents/service/${service.id}`)}>
          <div class="flex justify-between items-center mt-4">
            <h2 class="text-2xl font-bold">{service.name}</h2>
            <StatusIcon />
          </div>

          <p class="text-zinc-300 text-sm">{service.description}</p>
        </div>
      </div>
    </>
  )
}

export default ServiceCard
