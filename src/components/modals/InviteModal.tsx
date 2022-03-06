import { Component, Show, onMount, Setter, createEffect } from 'solid-js'
import { createMutation } from 'solid-urql'

import Modal from './Modal'

const CREATE_INVITE = `
  mutation {
    createInvite {
      id
      code
    }
  }
`

const InviteModal: Component<{ setShouldDisplay: Setter<Boolean> }> = ({
  setShouldDisplay,
}) => {
  const [inviteResult, createInvite] = createMutation(CREATE_INVITE)
  const invite = () => inviteResult()?.data?.createInvite

  onMount(() => {
    createInvite()
  })

  return (
    <Show when={invite()}>
      <Modal setShouldDisplay={setShouldDisplay}>
        <div class="text-center">
          <p class="text-sm">
            Share the link below to invite a user to your organization.
          </p>

          <p class="text-sm mb-4">This unique code can only be used once.</p>

          <p class="bg-zinc-900 p-8 rounded border border-zinc-700 shadow-inner shadow-zinc-900">
            https://{window.location.host}/signup?invite={invite().code}
          </p>
        </div>
      </Modal>
    </Show>
  )
}

export default InviteModal
