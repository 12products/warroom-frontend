import { Accessor, Component, createSignal, For, lazy } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import classnames from 'classnames'
import { useParams, useNavigate } from 'solid-app-router'

import { Incident, Event, HandleOnUpdateProps } from '../types'
import CreateStatusMessageButton from './modals/StatusMessageButton'
import CreateEventButton from './modals/CreateEventButton'

enum SECTION_TYPE {
  STATUSES = 'STATUSES',
  EVENTS = 'EVENTS',
  COMMENTS = 'COMMENTS',
}

const SECTIONS = {
  [SECTION_TYPE.STATUSES]: {
    id: SECTION_TYPE.STATUSES,
    component: lazy(() => import('./IncidentStatuses')),
    createComponent: CreateStatusMessageButton,
  },
  [SECTION_TYPE.EVENTS]: {
    id: SECTION_TYPE.EVENTS,
    component: lazy(() => import('./IncidentEvents')),
    createComponent: CreateEventButton,
  },
  [SECTION_TYPE.COMMENTS]: {
    id: SECTION_TYPE.COMMENTS,
    component: lazy(() => import('./IncidentStatuses')),
    createComponent: CreateStatusMessageButton,
  },
}

type Props = {
  incident: Accessor<Incident | undefined>
  handleOnUpdate: (args?: HandleOnUpdateProps) => void
}

const IncidentDetails: Component<Props> = ({ incident, handleOnUpdate }) => {
  const navigate = useNavigate()
  const { id: incidentId, section } = useParams()

  const currentSection =
    Object.keys(SECTION_TYPE).find((key) => key === section?.toUpperCase()) ||
    SECTION_TYPE.STATUSES

  const [getSelectedSection, setSelectedSection] = createSignal<SECTION_TYPE>(
    currentSection as SECTION_TYPE
  )

  const handleSectionChange = (sectionId: SECTION_TYPE) => {
    setSelectedSection(sectionId)
    navigate(`/incidents/${incidentId}/${sectionId.toLowerCase()}`)
  }

  return (
    <section class="shadow shadow-zinc-900/50 rounded border border-zinc-700">
      <header class="rounded-t flex items-center justify-between px-8 py-4 border-b border-zinc-700 bg-zinc-800">
        <div class="flex space-x-8">
          <For each={Object.values(SECTIONS)}>
            {({ id: sectionId }) => {
              return (
                <h2
                  class={classnames(
                    {
                      'text-zinc-500': getSelectedSection() !== sectionId,
                    },
                    'hover:text-green-500 hover:cursor-pointer capitalize'
                  )}
                  onClick={() => handleSectionChange(sectionId)}
                >
                  {sectionId.toLowerCase()}
                </h2>
              )
            }}
          </For>
        </div>

        <Dynamic
          component={SECTIONS[getSelectedSection()].createComponent}
          handleOnUpdate={handleOnUpdate}
        />
      </header>

      <Dynamic
        component={SECTIONS[getSelectedSection()].component}
        incident={incident}
      />
    </section>
  )
}

export default IncidentDetails
