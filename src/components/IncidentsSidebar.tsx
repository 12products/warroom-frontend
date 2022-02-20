import { Component, For } from 'solid-js'

import IncidentsSidebarItem from './IncidentsSidebarItem'
import { IncidentsSidebarItem as IncidentsSidebarItemType } from '../types/ui'

const SIDEBAR_ITEMS = [
  { title: 'My Incidents', route: '/incidents/assigned' },
  { title: 'Open Incidents', route: '/incidents/open' },
] as IncidentsSidebarItemType[]

const IncidentsSidebar: Component = () => {
  return (
    <aside class="col-span-1 ">
      <div class="bg-zinc-800 border border-zinc-700 rounded p-4 text-sm text-zinc-300 space-y-4">
        <section class="space-y-1">
          <For each={SIDEBAR_ITEMS}>
            {(sidebarItem) => <IncidentsSidebarItem item={sidebarItem} />}
          </For>
        </section>

        <section>
          <h3 class="px-2 py-1 text-zinc-500">Services</h3>
        </section>
      </div>
    </aside>
  )
}

export default IncidentsSidebar
