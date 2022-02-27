import { Component } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation, createQuery } from 'solid-urql'

import Input from '../../Input'
import Button from '../../Button'
import FormDropdown from '../../FormDropdown'
import { serviceStatusOptions } from '../../../types/service'

const UPDATE_SERVICE_MUTATION = `
  mutation($input: UpdateServiceInput!) {
    updateService(updateServiceInput: $input) {
      id
    }
  }
`

const GET_SERVICE = `
  query($id: ID!) {
    service(id: $id) {
      name
      description
      link
    }
  }
`

type Props = {
  serviceId: string
  onUpdateService: () => void
}

const UpdateServiceForm: Component<Props> = ({
  serviceId,
  onUpdateService,
}) => {
  const [updateServiceResult, updateService] = createMutation(
    UPDATE_SERVICE_MUTATION
  )
  const [serviceResult] = createQuery({
    query: GET_SERVICE,
    variables: { id: serviceId },
  })

  return (
    <Form
      initialValues={{
        name: serviceResult()?.service.name || '',
        description: serviceResult()?.service.description || '',
        link: serviceResult()?.service.link || '',
        status: serviceResult()?.service.status || '',
        private: serviceResult()?.service.private ? 'true' : 'false',
      }}
      validation={{
        name: Yup.string(),
        description: Yup.string(),
        link: Yup.string(),
        status: Yup.string(),
        private: Yup.string(),
      }}
      onSubmit={async ({
        values: { name, description, link, status, private: privateStatus },
      }) => {
        await updateService({
          input: {
            id: serviceId,
            name,
            description,
            link,
            status,
            private: privateStatus === 'true',
          },
        })
        onUpdateService()
      }}
    >
      <div class="flex flex-col">
        <div class="space-y-4">
          <Input name="name" label="Name" />
          <Input name="description" label="Description" />
          <Input name="link" label="Link" />
          <FormDropdown
            options={() => serviceStatusOptions}
            placeholder="Select status..."
            field="status"
          />
          <FormDropdown
            options={() => [
              { id: 'true', label: 'true' },
              { id: 'false', label: 'false' },
            ]}
            placeholder="Set private status..."
            field="private"
          />
        </div>

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Update Service
        </Button>
      </div>
    </Form>
  )
}

export default UpdateServiceForm
