import { Component, createContext, createEffect, Show } from 'solid-js'
import { createStore, Store } from 'solid-js/store'

import WarRoomModal from '../components/modals/WarRoomModal'

export type WarRoomState = {
  isInRoom: boolean
  url: string | null
}

type WarRoomActions = {
  showLobby: (url: string) => void
  joinRoom: () => void
  leaveRoom: () => void
}

const EMPTY_STATE = {
  isInRoom: false,
  url: null,
}

const [state, setState] = createStore<WarRoomState>(EMPTY_STATE)

const ACTIONS = {
  showLobby: (url: string) => {
    setState({ isInRoom: false, url })
  },
  joinRoom: () => {
    setState({ isInRoom: true })
  },
  leaveRoom: () => setState({ isInRoom: false, url: null }),
}

type WarRoomStore = [Store<WarRoomState>, WarRoomActions]

const store: WarRoomStore = [state, ACTIONS]

export const WarRoomContext = createContext<WarRoomStore>([
  EMPTY_STATE,
  ACTIONS,
])

export const WarRoomProvider: Component = ({ children }) => {
  return (
    <WarRoomContext.Provider value={store}>
      {children}

      <Show when={state.url}>
        <WarRoomModal />
      </Show>
    </WarRoomContext.Provider>
  )
}
