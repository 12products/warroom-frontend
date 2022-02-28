import { Component, useContext } from 'solid-js'
import { useNavigate, NavLink } from 'solid-app-router'

import Logo from '../Logo'
import { AuthContext } from '../../context/AuthProvider'
import Button from '../Button'
import CreateButton from '../modals/CreateButton'

const Nav: Component = () => {
  const navigate = useNavigate()
  const [_, { signOut }] = useContext(AuthContext)

  const handleSignOut = () => {
    signOut()
    navigate('/signin')
  }

  return (
    <>
      <nav class="flex justify-between items-center mb-4">
        <Logo />

        <div class="space-x-4">
          <NavLink href="/incidents" class="hover:text-green-500 text-zinc-400">
            Incidents
          </NavLink>

          <NavLink href="/services" class="hover:text-green-500 text-zinc-400">
            Services
          </NavLink>

          <span
            class="hover:text-green-500 text-zinc-400 hover:cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </span>
        </div>
      </nav>
    </>
  )
}

export default Nav
