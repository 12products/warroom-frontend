import { Component, useContext, createSignal, Show } from 'solid-js'
import { useNavigate } from 'solid-app-router'
import { IoPersonCircleOutline } from 'solid-icons/io'

import { AuthContext } from '../context/AuthProvider'
import { getUseDirectives } from '../utils/directives'
import onClickOutside from '../directives/onClickOutside'

const UserMenu: Component = () => {
  const navigate = useNavigate()
  const [_, { signOut }] = useContext(AuthContext)
  const [getShowMenu, setShowMenu] = createSignal(false)

  const handleSignOut = () => {
    signOut()
    navigate('/signin')
  }

  return (
    <div class="text-zinc-400 relative">
      <IoPersonCircleOutline
        size={24}
        class="hover:text-green-500 hover:cursor-pointer"
        onClick={() => setShowMenu(true)}
      />

      <Show when={getShowMenu()}>
        <div
          ref={getUseDirectives([onClickOutside, () => setShowMenu(false)])}
          class="absolute bg-zinc-800 border border-zinc-400 border-opacity-25 z-10 right-0 mt-1 rounded shadow-lg shadow-zinc-900/50"
        >
          <div
            onClick={() => navigate('/settings')}
            class="hover:bg-zinc-700 hover:text-white p-2 hover:cursor-pointer capitalize text-sm min-w-[max-content]"
          >
            Settings
          </div>

          <div
            onClick={handleSignOut}
            class="hover:bg-zinc-700 hover:text-white p-2 hover:cursor-pointer capitalize text-sm min-w-[max-content]"
          >
            Sign out
          </div>
        </div>
      </Show>
    </div>
  )
}

export default UserMenu
