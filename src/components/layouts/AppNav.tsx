import { Component, createEffect, Show, useContext } from 'solid-js'
import { NavLink, useNavigate } from 'solid-app-router'
import { createQuery } from 'solid-urql'

import Logo from '../Logo'
import UserMenu from '../UserMenu'
import { AuthContext } from '../../context/AuthProvider'

const GET_USER = `
  query($id: ID!) {
    user(id: $id) {
      id
      organization {
        id
      }
    }
  }
`

const Nav: Component = () => {
  const navigate = useNavigate()
  const [{ user: authUser }] = useContext(AuthContext)
  const user = () => userResults()?.user
  const [userResults] = createQuery({
    query: GET_USER,
    variables: { id: authUser?.id },
  })

  createEffect(() => {
    if (user() && !user()?.organization.id) {
      navigate('/onboard')
    }
  })

  return (
    <>
      <nav class="flex justify-between items-center mb-4 text-sm">
        <Logo />

        <div class="space-x-4 flex items-center">
          <Show when={user()?.organization.id}>
            <NavLink
              href={`/${user()?.organization.id}`}
              class="hover:text-green-500 text-zinc-400"
            >
              Status
            </NavLink>
          </Show>

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
