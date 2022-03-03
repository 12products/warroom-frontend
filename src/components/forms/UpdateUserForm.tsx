import { Component, createSignal, Show, useContext } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation, createQuery } from 'solid-urql'

import Input from '../Input'
import Button from '../Button'
import ErrorAlert from '../ErrorAlert'
import { AuthContext } from '../../context/AuthProvider'

const GET_USER = `
  query($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`

const UPDATE_USER = `
  mutation($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      id
    }
  }
`

const SignIn: Component = () => {
  const [{ user: authUser }] = useContext(AuthContext)
  const [userResults] = createQuery({
    query: GET_USER,
    variables: { id: authUser?.id },
  })
  const [_, updateUser] = createMutation(UPDATE_USER)
  const user = () => userResults()?.user

  return (
    <Show when={user()}>
      <Form
        initialValues={{
          email: user()?.email,
          firstName: user()?.firstName,
          lastName: user()?.lastName,
        }}
        validation={{
          email: Yup.string().email().required(),
          firstName: Yup.string().required(),
          lastName: Yup.string().required(),
        }}
        onSubmit={async ({ values }) => {
          await updateUser({ input: { ...values, id: authUser?.id } })
        }}
      >
        <div class="space-y-4">
          <Input name="firstName" label="First Name" />
          <Input name="lastName" label="Last Name" />
          <Input name="email" label="Email" />
        </div>

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Save
        </Button>
      </Form>
    </Show>
  )
}

export default SignIn
