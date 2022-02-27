import { Accessor, Setter } from 'solid-js'

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
