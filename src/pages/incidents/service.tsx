import {
  Component,
  createEffect,
  createRenderEffect,
  createResource,
  createSignal,
} from 'solid-js'
import { createQuery, useClient } from 'solid-urql'
import { useParams } from 'solid-app-router'

import IncidentsSidebar from '../../components/IncidentsSidebar'
import IncidentsTable from '../../components/IncidentsTable'
import AppLayout from '../../components/layouts/AppLayout'

const GET_INCIDENTS_BY_SERVICES = `
  query($id: ID!) {
    incidentsByServiceId(serviceId: $id) {
      id
      description
      status
      title
      incidentDate
      severity
    }
  }
`
const Incidents: Component = () => {
  const params = useParams()
  const [getId, setId] = createSignal(params.id)
  const client = useClient()
  const variables = () => ({
    id: params.id,
  })
  const [incidentsByServiceResult, eyyyyy, reexecuteQuery] = createQuery({
    query: GET_INCIDENTS_BY_SERVICES,
    variables: {
      id: params.id,
    },
  })
  createEffect(async () => {
    if (params.id !== getId()) {
      console.log('fuck you', params.id)
      reexecuteQuery()
      console.log(incidentsByServiceResult(), eyyyyy(), reexecuteQuery())
    }
    setId(params.id)
  })

  // createRenderEffect(() => {
  //   console.log(params.id)
  //   setId(params.id)
  //   reexecuteQuery({
  //     requestPolicy: 'network-only',
  //     variables: { id: getId() },
  //   })
  // })
  const incidents = () => incidentsByServiceResult()?.incidentsByServiceId
  return (
    <AppLayout>
      <main class="grid gap-4 grid-cols-4">
        <IncidentsSidebar />
        <IncidentsTable incidents={incidents} />
      </main>
    </AppLayout>
  )
}

export default Incidents
