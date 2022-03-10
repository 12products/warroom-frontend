import { useClient, createQuery } from 'solid-urql'
import { useSearchParams } from 'solid-app-router'
import { Component, Accessor, createSignal, createEffect, useContext } from 'solid-js'

import Dropdown from '../Dropdown'
import { DropdownOption } from '../../types'
import { AuthContext } from '../../context/AuthProvider'
import { incidentStatusOptions } from '../../types/incident'

const GET_FILTERED_INCIDENTS = `
  query($status: String, $organizationId: String, $assigneeId: String) {
    filteredIncidents(status: $status, organizationId: $organizationId, assigneeId: $assigneeId) {
      id
      description
      status
      title
      incidentDate
      severity
    }
  }
`

const GET_USER = `
  query($id: ID!) {
    user(id: $id) {
      id
      organization {
        id
      }
    }
  }
`

// const GET_USERS = `
//   query {
//     users {
//       id
//       firstName
//     }
//   }
// `

const fetchIncidentsByStatus = async (status: string, organizationId: string, assigneeId: string) => {
  const client = useClient()
  const { data } = await client
    .query(GET_FILTERED_INCIDENTS, { status, organizationId, assigneeId })
    .toPromise()

  return data?.filteredIncidents
}

const IncidentFilters: Component<Props> = ({ setIncidents }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [getSelectedStatus, setSelectedStatus] = createSignal<string | null>(null)  
  // const [getSelectedAssignee, setSelectedAssignee] = createSignal<string | null>(null)  
  
  // const [usersResult] = createQuery({ query: GET_USERS })

  // const userOptions = () =>
  //   usersResult()?.users.map(({ id, firstName }: User) => ({
  //     id,
  //     label: firstName,
  //   })) || []

  const [{ user: authUser }] = useContext(AuthContext)
  const [userResults] = createQuery({
    query: GET_USER,
    variables: { id: authUser?.id },
  })
  const user = () => userResults()?.user
  
  createEffect(async () => {
    setIncidents(await fetchIncidentsByStatus(searchParams?.status?.toUpperCase(), user()?.organization?.id ?? '', searchParams?.assigneeId))
    setSelectedStatus(searchParams?.status)
  })

  const onSelectedStatus = (option: DropdownOption) => {
    setSelectedStatus(option.label)
    setSearchParams({ status: option.label?.toLowerCase() ?? '' })
  }

  // const onSelectedAssignee = (option: DropdownOption) => {
  //   setSelectedAssignee(option.label)
  //   setSearchParams({ assigneeId: option.id?.toLowerCase() ?? '' })
  // }

  return (
    <div class='flex'>
      <div class="flex items-center">
        <span class='text-sm mr-1'>{getSelectedStatus() !== null && 'Status:'}</span>
        <Dropdown
          placeholder='Status'
          selected={getSelectedStatus as Accessor<string>}
          options={() => incidentStatusOptions}
          onSelected={onSelectedStatus}
          dropdownClass="w-40 border-transparent hover:border-zinc-400 hover:border-opacity-25" />
      </div>
      {/* <div class="flex items-center">
        <span class='text-sm mr-1'>{getSelectedAssignee() !== null && 'Assignee:'}</span>
        <Dropdown
          placeholder='Assignee'
          selected={getSelectedAssignee as Accessor<string>}
          options={() => userOptions()}
          onSelected={onSelectedAssignee}
          dropdownClass="w-40 border-transparent hover:border-zinc-400 hover:border-opacity-25" />
      </div> */}
    </div>
  )
}

export default IncidentFilters

type Props = {
  setIncidents: (value: any[]) => void
}