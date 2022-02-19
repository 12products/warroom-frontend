import { Component, createSignal, For } from 'solid-js'
import classnames from 'classnames'

enum SECTION_TYPE {
  STATUSES = 'statuses',
  EVENTS = 'events',
  COMMENTS = 'comments',
}

const SECTIONS = {
  [SECTION_TYPE.STATUSES]: {
    id: SECTION_TYPE.STATUSES,
    title: 'Statuses',
  },
  [SECTION_TYPE.EVENTS]: {
    id: SECTION_TYPE.EVENTS,
    title: 'Events',
  },
  [SECTION_TYPE.COMMENTS]: {
    id: SECTION_TYPE.COMMENTS,
    title: 'Comments',
  },
}

const IncidentDetails: Component = () => {
  const [selectedSection, setSelectedSection] = createSignal(
    SECTION_TYPE.STATUSES
  )

  return (
    <section class="border border-zinc-700 rounded p-4">
      <header class="flex space-x-4">
        <For each={Object.values(SECTIONS)}>
          {({ id, title }) => {
            return (
              <h2
                class={classnames(
                  {
                    'text-zinc-500': selectedSection() !== id,
                  },
                  'hover:text-green-500 hover:cursor-pointer'
                )}
                onClick={() => setSelectedSection(id)}
              >
                {title}
              </h2>
            )
          }}
        </For>
      </header>
    </section>
  )
}

export default IncidentDetails
