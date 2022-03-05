import { Accessor, Component } from 'solid-js'
import { createQuery } from 'solid-urql'

import { User } from '../types/user'
import IncidentProperty from './IncidentProperty'
import {
  incidentStatusOptions,
  incidentSeverityOptions,
  Incident,
} from '../types/incident'
import { DropdownOption } from '../types/ui'

type Props = {
  incident: Accessor<Incident | undefined>
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
  const defaultUserOptions: DropdownOption[] = []

  if (incident()?.assignee) {
    defaultUserOptions.push({
      id: incident()?.assignee.id || '',
      label: incident()?.assignee.firstName || '',
    })
  }

  const userOptions = () =>
    usersResult()?.users.map(({ id, firstName }: User) => ({
      id,
      label: firstName,
    })) || defaultUserOptions

  return (
    <section class="bg-zinc-800 border border-zinc-700 rounded p-4 text-sm shadow shadow-zinc-900/50">
      <IncidentProperty
        label="Status"
        selected={incident()?.status || null}
        options={() => incidentStatusOptions}
      />

      <IncidentProperty
        label="Severity"
        selected={incident()?.severity || null}
        options={() => incidentSeverityOptions}
      />

      <IncidentProperty
        label="Assignee"
        selected={incident()?.assignee?.id || null}
        options={userOptions}
      />
    </section>
  )
}

export default IncidentProperties
