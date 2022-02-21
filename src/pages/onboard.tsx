import { Component, useContext, createEffect, Accessor } from 'solid-js'
import { useNavigate, useRouteData } from 'solid-app-router'
import { createQuery } from 'solid-urql'

import AuthLayout from '../components/layouts/AuthLayout'
import OnboardForm from '../components/OnboardForm'
import { AuthContext } from '../context/AuthProvider'

const GET_USER = `
  query($id: ID!) {
    user(id: $id) {
      id
    }
  }
`

const Services: Component = () => {
  const navigate = useNavigate()
  const [{ user: authUser }] = useContext(AuthContext)
  const [user, userState] = createQuery({
    query: GET_USER,
    variables: { id: authUser?.id },
  })

  createEffect(async () => {
    if (!userState().fetching && user().user) {
      navigate('/incidents')
    }
  })

  return (
    <AuthLayout>
      <aside class="p-8 text-sm border border-zinc-700 shadow shadow-zinc-900/50 rounded mb-8 space-y-2">
        <p class="font-semibold text-center">Thanks for joining War Room!</p>
        <p class="text-center">
          Let's create an organization for all of your incidents. Once you get
          inside the app, you'll be able to invite others to help you manage
          your incidents.
        </p>
      </aside>

      <main class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900/50">
        <OnboardForm />
      </main>
    </AuthLayout>
  )
}

export default Services
