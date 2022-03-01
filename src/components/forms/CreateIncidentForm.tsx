import { Component, onMount, Show } from 'solid-js'
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
import ErrorAlert from '../ErrorAlert'
import { User } from '../../types/user'

const GET_SERVICES_AND_USERS = `
  query {
    services {
      id
      name
    }
    users {
      id
      firstName
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
  const [servicesUsersResult] = createQuery({ query: GET_SERVICES_AND_USERS })
  const [createMutationResult, createIncident] = createMutation(CREATE_INCIDENT)

  const services = () =>
    servicesUsersResult()?.services.map(({ id, name }: Service) => ({
      id,
      label: name,
    })) || []

  const userOptions = () =>
    servicesUsersResult()?.users.map(({ id, firstName }: User) => ({
      id,
      label: firstName,
    })) || []

  const handleOnSubmit = async (
    form: FormType.Context<{
      title: string
      description: string
      incidentDate: string
      severity: string
      status: string
      serviceId: string
      assigneeId: string
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
        assigneeId: form.values.assigneeId,
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
          assigneeId: '',
        }}
        validation={{
          title: Yup.string().required(),
          description: Yup.string().required(),
          incidentDate: Yup.string(),
          severity: Yup.string(),
          status: Yup.string(),
          serviceId: Yup.string(),
          assigneeId: Yup.string(),
        }}
        onSubmit={async (form) => handleOnSubmit(form)}
      >
        <div class="space-y-4">
          <Input name="title" label="Title" />

          <Input name="description" label="Description" />
          {/*@ts-ignore*/}
          <Input name="incidentDate" label="Incident Date" ref={datePicker} />

          <FormDropdown
            label="Severity"
            options={() => incidentSeverityOptions}
            placeholder="Select severity..."
            field="severity"
          />

          <FormDropdown
            label="Status"
            options={() => incidentStatusOptions}
            placeholder="Select status..."
            field="status"
          />

          <FormDropdown
            label="Service"
            options={services}
            placeholder="Select service..."
            field="serviceId"
          />

          <FormDropdown
            label="Assignee"
            options={userOptions}
            placeholder="Select assignee..."
            field="assigneeId"
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
