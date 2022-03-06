import { FiPlus } from 'solid-icons/fi'
import { IoClose } from 'solid-icons/io'
import { Accessor, Component, createSignal, For, Show } from 'solid-js'

import { Invite } from '../types/invite'
import InviteRow from './InviteRow'
import InviteModal from './modals/InviteModal'

type Props = {
  invites: Accessor<Invite[]>
}

const InviteSection: Component<Props> = ({ invites }) => {
  const [showInviteModal, setShowInviteModal] = createSignal(false)

  return (
    <section>
      <For each={invites()}>
        {(invite: Invite) => <InviteRow invite={invite} />}
      </For>

      <button
        class="flex items-center space-x-1 justify-center w-full p-8 text-zinc-500 hover:text-zinc-300"
        onClick={() => setShowInviteModal(true)}
      >
        <FiPlus size={16} />
        <div>Invite Member</div>
      </button>

      <Show when={showInviteModal()}>
        <InviteModal setShouldDisplay={setShowInviteModal} />
      </Show>
    </section>
  )
}

export default InviteSection
