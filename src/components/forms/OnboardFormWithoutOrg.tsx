import { Component, useContext, Show } from 'solid-js'
import * as Yup from 'yup'
import { useNavigate } from 'solid-app-router'
import { createMutation, createQuery } from 'solid-urql'

import { Form } from '../../lib/form'
import Input from '../Input'
import Button from '../Button'
import { AuthContext } from '../../context/AuthProvider'

const CREATE_USER = `
  mutation($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`

const GET_INVITE = `
  query($code: ID!) {
    invite(code: $code) {
      id
      organization {
        id
        name
      }
    }
  }
`

type Props = {
  inviteCode: string
}

const OnboardFormWithoutOrg: Component<Props> = ({ inviteCode }) => {
  const [{ user }] = useContext(AuthContext)
  const [inviteResult] = createQuery({
    query: GET_INVITE,
    variables: { code: inviteCode },
  })
  const navigate = useNavigate()
  const [createUserResult, createUser] = createMutation(CREATE_USER)
  const organization = () => inviteResult()?.invite?.organization

  return (
    <>
      <Show when={organization()}>
        <aside class="p-8 text-sm border border-zinc-700 shadow shadow-zinc-900/50 rounded mb-8 space-y-2">
          <p class="font-semibold text-center">
            Welcome to {organization()?.name}!
          </p>
          <p class="text-center">
            Once you get inside the app, you'll be able to help manage all the
            incidents for your organization.
          </p>
        </aside>
      </Show>

      <main class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900/50">
        <Form
          initialValues={{
            firstName: '',
            lastName: '',
          }}
          validation={{
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
          }}
          onSubmit={async ({ values: { firstName, lastName } }) => {
            await createUser({
              input: {
                id: user?.id,
                email: user?.email,
                firstName,
                lastName,
                inviteCode,
              },
            })

            if (createUserResult().error) {
              alert('Something went wrong, please try again.')
              return
            }

            navigate('/incidents')
          }}
        >
          <div class="flex flex-col">
            <div class="space-y-4">
              <Input name="firstName" label="First Name" />
              <Input name="lastName" label="Last Name" />
            </div>

            <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
              Continue
            </Button>
          </div>
        </Form>
      </main>
    </>
  )
}

export default OnboardFormWithoutOrg
