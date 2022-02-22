import {
  Component,
  createEffect,
  onCleanup,
  createSignal,
  Show,
  Switch,
  Match,
} from 'solid-js'
import { useParams } from 'solid-app-router'
import { createQuery } from 'solid-urql'
import DailyIframe from '@daily-co/daily-js'
import classnames from 'classnames'
import { FiMaximize2, FiMinimize2 } from 'solid-icons/fi'
import { FaSolidDoorOpen } from 'solid-icons/fa'

import { ModalProps } from './Modal'
import onClickOutside from '../../directives/onClickOutside'
import { getUseDirectives } from '../../utils/directives'
import { Portal } from 'solid-js/web'

const GET_ROOM_URL = `
  query incidentRoomURL($id: ID!) {
    incidentRoomURL(id: $id)
  }
`

const WarRoomModal: Component<ModalProps> = ({
  getShouldDisplay,
  setShouldDisplay,
}) => {
  const params = useParams()
  const [roomURLResult] = createQuery({
    query: GET_ROOM_URL,
    variables: { id: params.id },
  })
  const roomURL = () => roomURLResult()?.incidentRoomURL
  const [getIsMinimized, setIsMinimized] = createSignal(false)
  const [getIsInWarRoom, setIsInWarRoom] = createSignal(false)

  let iframe: any

  createEffect(() => {
    let callFrame: any

    if (roomURL() && iframe) {
      callFrame = DailyIframe.wrap(iframe, {
        url: roomURL(),
      })

      callFrame.setTheme({
        colors: {
          accent: '#16a34a',
          accentText: '#FFFFFF',
          background: '#27272a',
          backgroundAccent: '#27272a',
          baseText: '#e5e5e5',
          border: '#404040',
          mainAreaBg: '#27272a',
          mainAreaBgAccent: '#27272a',
          mainAreaText: '#e5e5e5',
          supportiveText: '#808080',
        },
      })

      callFrame.join()

      callFrame.on('joined-meeting', () => {
        setIsInWarRoom(true)
      })
    }

    onCleanup(() => {
      callFrame?.leave()
      callFrame?.destroy()
    })
  })

  return (
    <Portal>
      <div
        class={classnames([
          'absolute ',
          {
            'w-screen h-screen flex justify-center items-center bg-black bg-opacity-25 top-0':
              !getIsMinimized(),
            'bottom-8 right-8': getIsMinimized(),
          },
        ])}
      >
        <div
          ref={getUseDirectives([
            onClickOutside,
            () => setShouldDisplay(false),
          ])}
          class="flex flex-col items-center"
        >
          <div
            style={{
              height: `calc(${getIsMinimized() ? '50' : '100'}vh - 8em)`,
              width: `calc(${getIsMinimized() ? '50' : '100'}vw - 8em)`,
            }}
            class="bg-zinc-800 border border-zinc-700 rounded shadow-2xl shadow-zinc-900 overflow-hidden mb-4 relative"
          >
            <iframe
              style={{ height: 'calc(100% + 2em)' }}
              class="w-full rounded -mt-8"
              ref={iframe}
              allow="microphone; camera; autoplay; display-capture"
            />

            <Show when={getIsInWarRoom()}>
              <div class="absolute bottom-0 right-0 text-xs py-1.5 px-4 space-x-4 flex justify-center items-center text-zinc-300">
                <div
                  onClick={() => setIsMinimized(!getIsMinimized())}
                  class="hover:cursor-pointer flex flex-col items-center space-y-1"
                >
                  <Switch>
                    <Match when={getIsMinimized()}>
                      <FiMaximize2 size={20} />
                    </Match>
                    <Match when={!getIsMinimized()}>
                      <FiMinimize2 size={20} />
                    </Match>
                  </Switch>

                  <div>
                    <Switch>
                      <Match when={getIsMinimized()}>Maximize</Match>
                      <Match when={!getIsMinimized()}>Minimize</Match>
                    </Switch>
                  </div>
                </div>

                <div
                  onClick={() => setShouldDisplay(false)}
                  class="hover:cursor-pointer flex flex-col items-center space-y-1"
                >
                  <FaSolidDoorOpen size={20} />
                  <div>Leave</div>
                </div>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default WarRoomModal
