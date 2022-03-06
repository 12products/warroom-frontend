import { Component, For } from 'solid-js'
import { createQuery } from 'solid-urql'

import { User } from '../types/user'
import InviteSection from './InviteSection'

const GET_ORGANIZATION_USERS = `
  query {
    organization {
      id
      users {
        id
        firstName
        lastName
        role
        email
      }
      invites {
        id
        code
      }
    }
  }
`

const OrganizationMembers: Component = () => {
  const [usersResults] = createQuery({
    query: GET_ORGANIZATION_USERS,
  })

  const users = () => usersResults()?.organization.users || []
  const invites = () => usersResults()?.organization.invites || []

  return (
    <>
      <section>
        <For each={users()}>
          {(user: User) => (
            <div class="flex justify-between items-center text-sm border-b border-zinc-700 m-8 mb-0 pb-8">
              <div>
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div class="text-xs text-zinc-400">{user.email}</div>
              </div>

              <div class="text-zinc-300 text-xs">{user.role}</div>
            </div>
          )}
        </For>
      </section>

      <InviteSection invites={invites} />
    </>
  )
}

export default OrganizationMembers
