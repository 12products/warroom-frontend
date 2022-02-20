import { Component } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation } from 'solid-urql'

import Button from './Button'
import Input from './Input'
import DropdownForm from './FormDropdown'
import { IncidentStatus } from '../types/incident'
import { DropdownOption } from '../types/ui'

const CreateIncidentMutation = `
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

const serviceOptions: DropdownOption[] = [
  { id: 'bb41245e-cd22-402d-9f79-e04f2390d83f', label: 'Service 1' },
  { id: 'cfb79f35-bb0e-4fd3-8c93-30af62d82f1e', label: 'Service 2' },
  { id: 'ea0050ef-2ca5-4692-b18d-5a24733d5367', label: 'Service 3' },
]

const CreateIncidentForm: Component = () => {
  const [createIncidentResult, createIncident] = createMutation(
    CreateIncidentMutation
  )
  const handleOnSubmit = (
    form: FormType.Context<{
      description: string
      status: string
      serviceId: string
    }>
  ) => {
    const variables = {
      input: {
        description: form.values.description,
        status: form.values.status,
        serviceId: form.values.serviceId,
      },
    }
    createIncident(variables).then((result) => console.log(result))
  }
  return (
    <Form
      initialValues={{ description: '', status: '', serviceId: '' }}
      validation={{
        description: Yup.string().required(),
        status: Yup.string().required(),
        serviceId: Yup.string().required(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="grid grid-cols-1 gap-4 place-content-center m-24">
        <div class="space-y-4">
          <Input name="description" label="Description" />
        </div>
        <DropdownForm
          options={statusOptions}
          placeholder="Select status"
          field="status"
        />
        <DropdownForm
          options={serviceOptions}
          placeholder="Select service"
          field="serviceId"
        />

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Create
        </Button>
      </div>
    </Form>
  )
}

export default CreateIncidentForm
