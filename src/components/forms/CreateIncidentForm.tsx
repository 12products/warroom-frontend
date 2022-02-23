import { Component, Setter } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation, createQuery } from 'solid-urql'

import Button from '../Button'
import Input from '../Input'
import FormDropdown from '../FormDropdown'
import { incidentStatusOptions } from '../../types/incident'
import { Service } from '../../types/service'

const GET_SERVICES = `
  query {
    services {
      id
      name
    }
  }
`

const CREATE_INCIDENT = `
  mutation ($input: CreateIncidentInput!) {
    createIncident(createIncidentInput: $input){
      id
    }
  }
`
type Props = {
  onCreateIncident: () => void
}

const CreateIncidentForm: Component<Props> = ({ onCreateIncident }) => {
  const [servicesResult] = createQuery({ query: GET_SERVICES })
  const [_, createIncident] = createMutation(CREATE_INCIDENT)

  const services = () =>
    servicesResult()?.services.map(({ id, name }: Service) => ({
      id,
      label: name,
    })) || []

  const handleOnSubmit = async (
    form: FormType.Context<{
      title: string
      description: string
      status: string
      serviceId: string
    }>
  ) => {
    const variables = {
      input: {
        title: form.values.title,
        description: form.values.description,
        status: form.values.status,
        serviceId: form.values.serviceId,
      },
    }

    await createIncident(variables)
    onCreateIncident()
  }

  return (
    <Form
      initialValues={{
        title: '',
        description: '',
        status: '',
        serviceId: '',
      }}
      validation={{
        title: Yup.string().required(),
        description: Yup.string().required(),
        status: Yup.string().required(),
        serviceId: Yup.string().required(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="space-y-4">
        <Input name="title" label="Title" />

        <Input name="description" label="Description" />

        <FormDropdown
          options={() => incidentStatusOptions}
          placeholder="Select status..."
          field="status"
        />

        <FormDropdown
          options={services}
          placeholder="Select service..."
          field="serviceId"
        />
      </div>

      <Button type="submit" buttonClass="py-2 mt-8 font-semibold w-full">
        Create
      </Button>
    </Form>
  )
}

export default CreateIncidentForm
