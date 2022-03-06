import { Accessor, Setter } from 'solid-js'
import { StatusMessage } from './statusMessage'
import { Event } from './event'

export type IncidentsSidebarItem = {
  title: string
  route: string
}

export type DropdownOption = {
  id: string
  label: string
}

export type CreateModalProps = {
  getShouldDisplay: Accessor<Boolean>
  setShouldDisplay: Setter<Boolean>
}

export type ModalProps = {
  setShouldDisplay: Setter<Boolean>
}

export type IncidentUpdateProps = {
  event?: Event
  statusMessage?: StatusMessage
}

export type HandleOnUpdateProps = {
  handleOnUpdate: (args: IncidentUpdateProps) => void
}
