import { Component } from 'solid-js'
import { NavLink } from 'solid-app-router'

import Logo from '../Logo'
import UserMenu from '../UserMenu'

const Nav: Component = () => {
  return (
    <>
      <nav class="flex justify-between items-center mb-4 text-sm">
        <Logo />

        <div class="space-x-4 flex items-center">
          <NavLink href="/incidents" class="hover:text-green-500 text-zinc-400">
            Incidents
          </NavLink>

          <NavLink href="/services" class="hover:text-green-500 text-zinc-400">
            Services
          </NavLink>

          <UserMenu />
        </div>
      </nav>
    </>
  )
}

export default Nav
