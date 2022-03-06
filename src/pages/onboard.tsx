import { Component, useContext, createEffect, Switch, Match } from 'solid-js'
import { useNavigate } from 'solid-app-router'
import { createQuery } from 'solid-urql'

import AuthLayout from '../components/layouts/AuthLayout'
import OnboardFormWithOrg from '../components/forms/OnboardFormWithOrg'
import OnboardFormWithoutOrg from '../components/forms/OnboardFormWithoutOrg'
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
  const inviteCode = localStorage.getItem('inviteCode')

  createEffect(async () => {
    if (!userState().fetching && user().user) {
      navigate('/incidents')
    }
  })

  return (
    <AuthLayout>
      <Switch>
        <Match when={inviteCode}>
          <OnboardFormWithoutOrg inviteCode={inviteCode || ''} />
        </Match>
        <Match when={!inviteCode}>
          <OnboardFormWithOrg />
        </Match>
      </Switch>
    </AuthLayout>
  )
}

export default Services
