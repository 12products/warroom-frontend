import { Navigate, useParams } from 'solid-app-router'
import { Component, createEffect, onCleanup } from 'solid-js'
import { createQuery } from 'solid-urql'
import DailyIframe from '@daily-co/daily-js'
import { useNavigate } from 'solid-app-router'

import RoomLayout from '../../../components/layouts/RoomLayout'

const GET_ROOM_URL = `
  query incidentRoomURL($id: ID!) {
    incidentRoomURL(id: $id)
  }
`

const Room: Component = () => {
  const params = useParams()
  const [roomURLResult] = createQuery({
    query: GET_ROOM_URL,
    variables: { id: params.id },
  })
  const navigate = useNavigate()
  let iframe: any

  const roomURL = () => roomURLResult()?.incidentRoomURL

  createEffect(() => {
    let callFrame: any

    if (roomURL() && iframe) {
      callFrame = DailyIframe.wrap(iframe, {
        url: roomURL(),
        showLeaveButton: true,
        showFullscreenButton: true,
      })

      callFrame.setTheme({
        colors: {
          accent: '#286DA8',
          accentText: '#FFFFFF',
          background: '#18181b',
          backgroundAccent: '#18181b',
          baseText: '#FFFFFF',
          border: '#EBEFF4',
          mainAreaBg: '#18181b',
          mainAreaBgAccent: '#18181b',
          mainAreaText: '#FFFFFF',
          supportiveText: '#808080',
        },
      })

      callFrame.join()

      callFrame.on('left-meeting', () => {
        navigate(`/incidents/${params.id}`)
      })
    }

    onCleanup(() => {
      callFrame?.leave()
      callFrame?.destroy()
    })
  })

  return (
    <RoomLayout>
      <div
        style={{ height: 'calc(100vh - 5em)' }}
        class="grid grid-rows-2 gap-8"
      >
        <iframe
          class="w-full h-full"
          ref={iframe}
          allow="microphone; camera; autoplay; display-capture"
        />

        <div>Events</div>
      </div>
    </RoomLayout>
  )
}

export default Room
