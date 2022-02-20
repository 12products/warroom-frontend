import { Component } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'
import { useNavigate } from 'solid-app-router'
import { createMutation } from 'solid-urql'

import Input from './Input'
import Button from './Button'

const CREATE_SERVICE_MUTATION = `
  mutation($input: CreateServiceInput!) {
    createService(createServiceInput: $input) {
      id
    }
  }
`

const CreateServiceForm: Component = () => {
  const navigate = useNavigate()
  const [createServiceResult, createService] = createMutation(
    CREATE_SERVICE_MUTATION
  )

  return (
    <Form
      initialValues={{
        name: '',
        description: '',
        link: '',
        isPrivate: true,
      }}
      validation={{
        name: Yup.string().required(),
        description: Yup.string(),
        link: Yup.string(),
      }}
      onSubmit={async ({ values: { name, description, link, isPrivate } }) => {
        await createService({
          input: {
            name,
            description,
            link,
            private: isPrivate,
          },
        })

        const {
          data: {
            createService: { id },
          },
        } = createServiceResult()

        navigate(`/incidents/service/${id}`)
      }}
    >
      <div class="flex flex-col">
        <div class="space-y-4">
          <Input name="name" label="Name" />
          <Input name="description" label="Description" />
          <Input name="link" label="Link" />
        </div>

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Create Service
        </Button>
      </div>
    </Form>
  )
}

export default CreateServiceForm
