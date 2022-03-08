import { useParams } from 'solid-app-router'
import { Component, createSignal, Show, useContext } from 'solid-js'

import Button from './Button'
import WarRoomModal from './modals/WarRoomModal'
import { WarRoomContext } from '../context/WarRoomProvider'
import { createQuery } from 'solid-urql'

const GET_ROOM_URL = `
  query incidentRoomURL($id: ID!) {
    incidentRoomURL(id: $id)
  }
`

type Props = {
  roomURL?: string
}

const IncidentWarRoom: Component<Props> = ({ roomURL = '' }) => {
  const [_, { showLobby }] = useContext(WarRoomContext)
  const params = useParams()
  const [roomURLResult] = createQuery({
    query: GET_ROOM_URL,
    variables: { id: params.id },
  })

  const url = () => roomURL || roomURLResult()?.incidentRoomURL

  return (
    <Button buttonClass="w-full" onClick={() => showLobby(url())}>
      {roomURL ? 'Join' : 'Create'} War Room
    </Button>
  )
}

export default IncidentWarRoom
