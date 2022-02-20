import { Component, Show, createSignal, createEffect } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation, createQuery } from 'solid-urql'
import { useNavigate } from 'solid-app-router'

import Button from './Button'
import Input from './Input'
import FormDropdown from './FormDropdown'
import { IncidentStatus } from '../types/incident'
import { DropdownOption } from '../types/ui'
import { Service } from '../types/service'

const SERVICES_QUERY = `
  query {
    services {
      id
      name
    }
  }
`

const CREATE_INCIDENT_MUTATION = `
  mutation ($input: CreateIncidentInput!) {
    createIncident(createIncidentInput: $input){
      id
    }
  }
`

const statusOptions: DropdownOption[] = Object.keys(IncidentStatus).map(
  (status) => ({
    id: status,
    label: status,
  })
)

const CreateIncidentForm: Component = () => {
  const [getServices, setServices] = createSignal([])
  const [servicesResult, servicesState] = createQuery({ query: SERVICES_QUERY })
  const [createIncidentResult, createIncident] = createMutation(
    CREATE_INCIDENT_MUTATION
  )
  const navigate = useNavigate()

  createEffect(() => {
    if (!servicesState().fetching) {
      setServices(
        servicesResult().services.map(({ id, name }: Service) => ({
          id,
          label: name,
        }))
      )
    }
  })

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

    const {
      data: {
        createIncident: { id },
      },
    } = createIncidentResult()

    navigate(`/incidents/${id}`)
  }

  return (
    <Form
      initialValues={{ title: '', description: '', status: '', serviceId: '' }}
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
          options={statusOptions}
          placeholder="Select status..."
          field="status"
        />

        <Show
          when={getServices().length}
          fallback={
            <FormDropdown
              options={[]}
              placeholder="Select service..."
              field="serviceId"
            />
          }
        >
          <FormDropdown
            options={getServices()}
            placeholder="Select service..."
            field="serviceId"
          />
        </Show>
      </div>

      <Button type="submit" buttonClass="py-2 mt-8 font-semibold w-full">
        Create
      </Button>
    </Form>
  )
}

export default CreateIncidentForm
