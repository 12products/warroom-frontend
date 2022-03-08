import { IoClose } from 'solid-icons/io'
import { Component } from 'solid-js'
import { createMutation } from 'solid-urql'

import { Invite } from '../types/invite'

const REMOVE_INVITE = `
  mutation($id: ID!) {
    removeInvite(id: $id) {
      id
    }
  }
`

type Props = {
  invite: Invite
}

const InviteRow: Component<Props> = ({ invite }) => {
  const [_, removeInvite] = createMutation(REMOVE_INVITE)

  return (
    <div class="flex justify-between items-center text-sm border-b border-zinc-700 m-8 mb-0 pb-8">
      <div>
        <div>{invite.code}</div>
        <div class="text-xs text-zinc-400">
          https://{window.location.host}/signup?invite={invite.code}
        </div>
      </div>

      <div
        class="text-zinc-500 hover:text-zinc-300 hover:cursor-pointer text-xs"
        onClick={() => removeInvite({ id: invite.id })}
      >
        <IoClose size={18} />
      </div>
    </div>
  )
}

export default InviteRow
