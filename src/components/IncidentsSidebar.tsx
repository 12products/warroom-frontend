import { Component, For } from 'solid-js'
import { createQuery } from 'solid-urql'

import StatusSidebar from './StatusSidebar'
import IncidentsSidebarItem from './IncidentsSidebarItem'
import {
  IncidentsSidebarItem as IncidentsSidebarItemType,
  Service,
} from '../types'
import CreateIncidentButton from './modals/CreateIncidentButton'

const GET_SERVICES = `
  query {
    services {
      id
      name
      description
      status
    }
  }
`

const SIDEBAR_ITEMS = [
  { title: 'My Incidents', route: '/incidents/assigned' },
  { title: 'Open Incidents', route: '/incidents/open' },
] as IncidentsSidebarItemType[]

const IncidentsSidebar: Component = () => {
  const [services] = createQuery({ query: GET_SERVICES })

  return (
    <aside class="col-span-1">
      <div class="shadow shadow-zinc-900/50 bg-zinc-800 border border-zinc-700 rounded p-4 text-sm text-zinc-300 space-y-4">
        <CreateIncidentButton />
        <section class="space-y-1">
          <For each={SIDEBAR_ITEMS}>
            {(sidebarItem) => <IncidentsSidebarItem item={sidebarItem} />}
          </For>
        </section>

        <section class="space-y-1">
          <h3 class="px-2 py-1 text-zinc-500">Services</h3>

          <For each={services()?.services as Service[]}>
            {(service) => (
              <IncidentsSidebarItem
                item={{
                  title: service.name,
                  route: `/incidents/service/${service.id}`,
                }}
              />
            )}
          </For>
        </section>

        <StatusSidebar />
      </div>
    </aside>
  )
}

export default IncidentsSidebar
