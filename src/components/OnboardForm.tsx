import { Component, useContext } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'
import { useNavigate } from 'solid-app-router'
import { createMutation } from 'solid-urql'

import Input from './Input'
import Button from './Button'
import { AuthContext } from '../context/AuthProvider'

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

const CreateServiceForm: Component = () => {
  const [{ user }] = useContext(AuthContext)
  const navigate = useNavigate()
  const [createUserResult, createUser] = createMutation(CREATE_USER)
  const [createOrganizationResult, createOrganization] =
    createMutation(CREATE_ORGANIZATION)

  return (
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
        console.log('test', {
          error1: createUserResult().error,
          error2: createOrganizationResult().error,
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
  )
}

export default CreateServiceForm
