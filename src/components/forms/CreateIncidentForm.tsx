import { Component, createSignal, onMount, Show } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation, createQuery } from 'solid-urql'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

import Button from '../Button'
import Input from '../Input'
import FormDropdown from '../FormDropdown'
import {
  incidentStatusOptions,
  incidentSeverityOptions,
} from '../../types/incident'
import { Service } from '../../types/service'
import ErrorAlert from '../modals/ErrorAlert'

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
  const [createMutationResult, createIncident] = createMutation(CREATE_INCIDENT)

  const services = () =>
    servicesResult()?.services.map(({ id, name }: Service) => ({
      id,
      label: name,
    })) || []

  const handleOnSubmit = async (
    form: FormType.Context<{
      title: string
      description: string
      incidentDate: string
      severity: string
      status: string
      serviceId: string
    }>
  ) => {
    const variables = {
      input: {
        title: form.values.title,
        description: form.values.description,
        incidentDate: new Date(form.values.incidentDate),
        severity: form.values.severity,
        status: form.values.status,
        serviceId: form.values.serviceId,
      },
    }
    await createIncident(variables)
    if (!createMutationResult().error) {
      onCreateIncident()
    }
  }

  let datePicker: HTMLInputElement

  onMount(() => {
    flatpickr(datePicker as Node, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
    })
  })

  return (
    <>
      <Form
        initialValues={{
          title: '',
          description: '',
          incidentDate: '',
          severity: '',
          status: '',
          serviceId: '',
        }}
        validation={{
          title: Yup.string().required(),
          description: Yup.string().required(),
          incidentDate: Yup.string(),
          severity: Yup.string(),
          status: Yup.string(),
          serviceId: Yup.string(),
        }}
        onSubmit={async (form) => handleOnSubmit(form)}
      >
        <div class="space-y-4">
          <Input name="title" label="Title" />

          <Input name="description" label="Description" />
          {/*@ts-ignore*/}
          <Input name="incidentDate" label="Date" ref={datePicker} />

          <FormDropdown
            options={() => incidentSeverityOptions}
            placeholder="Select severity..."
            field="serverity"
          />

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
        <Show when={createMutationResult().error}>
          <ErrorAlert />
        </Show>
      </Form>
    </>
  )
}

export default CreateIncidentForm
