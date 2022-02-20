import { Component, For, Show } from 'solid-js'
import { createQuery } from 'solid-urql'

import IncidentsSidebarItem from './IncidentsSidebarItem'
import { IncidentsSidebarItem as IncidentsSidebarItemType } from '../types/ui'
import { Service } from '../types/service'

const SERVICES_QUERY = `
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
  const [services, servicesState] = createQuery({ query: SERVICES_QUERY })

  return (
    <aside class="col-span-1">
      <div class="shadow shadow-zinc-900/50 bg-zinc-800 border border-zinc-700 rounded p-4 text-sm text-zinc-300 space-y-4">
        <section class="space-y-1">
          <For each={SIDEBAR_ITEMS}>
            {(sidebarItem) => <IncidentsSidebarItem item={sidebarItem} />}
          </For>
        </section>

        <Show when={!servicesState().fetching}>
          <section class="space-y-1">
            <h3 class="px-2 py-1 text-zinc-500">Services</h3>

            <For each={services().services as Service[]}>
              {(service) => (
                <IncidentsSidebarItem
                  item={{
                    title: service.name,
                    route: `/incidents/s/${service.id}`,
                  }}
                />
              )}
            </For>
          </section>
        </Show>
      </div>
    </aside>
  )
}

export default IncidentsSidebar
