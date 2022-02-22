import { Accessor, Component } from 'solid-js'
import { createQuery } from 'solid-urql'

import { User } from '../types/user'
import IncidentProperty from './IncidentProperty'
import {
  incidentStatusOptions,
  incidentSeverityOptions,
} from '../types/Incident'

type Props = {
  incident: Accessor<any>
}

const GET_USERS = `
  query {
    users {
      id
      firstName
    }
  }
`

const IncidentProperties: Component<Props> = ({ incident }) => {
  const [usersResult] = createQuery({ query: GET_USERS })
  const defaultUserOptions = [
    { id: incident().assignee.id, label: incident().assignee.firstName },
  ]
  const userOptions = () =>
    usersResult()?.users.map(({ id, firstName }: User) => ({
      id,
      label: firstName,
    })) || defaultUserOptions

  return (
    <section class="bg-zinc-800 border border-zinc-700 rounded p-4 text-sm shadow shadow-zinc-900/50">
      <IncidentProperty
        label="Status"
        selected={incident()?.status}
        options={() => incidentStatusOptions}
      />

      <IncidentProperty
        label="Severity"
        selected={incident()?.severity}
        options={() => incidentSeverityOptions}
      />

      <IncidentProperty
        label="Assignee"
        selected={incident()?.assignee.id}
        options={userOptions}
      />
    </section>
  )
}

export default IncidentProperties
