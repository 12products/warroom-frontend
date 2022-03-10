import { Component, useContext } from 'solid-js'
import * as Yup from 'yup'
import { useNavigate } from 'solid-app-router'
import { createMutation } from 'solid-urql'

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

const CREATE_ORGANIZATION = `
  mutation($input: CreateOrganizationInput!) {
    createOrganization(createOrganizationInput: $input) {
      id
    }
  }
`

const OnboardFormWithOrg: Component = () => {
  const [{ user }] = useContext(AuthContext)
  const navigate = useNavigate()
  const [createUserResult, createUser] = createMutation(CREATE_USER)
  const [createOrganizationResult, createOrganization] =
    createMutation(CREATE_ORGANIZATION)

  return (
    <>
      <aside class="p-8 text-sm border border-zinc-700 shadow shadow-zinc-900/50 rounded mb-8 space-y-2">
        <p class="font-semibold text-center">Thanks for joining War Room!</p>
        <p class="text-center">
          Let's create an organization for all of your incidents. Once you get
          inside the app, you'll be able to invite others to help you manage
          your incidents.
        </p>
      </aside>

      <main class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900/50">
        <Form
          initialValues={{
            firstName: '',
            lastName: '',
            organizationName: '',
          }}
          validation={{
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            organizationName: Yup.string().required(),
          }}
          onSubmit={async ({
            values: { firstName, lastName, organizationName },
          }) => {
            await createUser({
              input: {
                id: user?.id,
                email: user?.email,
                firstName,
                lastName,
              },
            })

            await createOrganization({
              input: {
                name: organizationName,
              },
            })

            if (createUserResult().error || createOrganizationResult().error) {
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
              <Input name="organizationName" label="Organization Name" />
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

export default OnboardFormWithOrg
