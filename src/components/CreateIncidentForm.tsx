import { Component } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'

import { IncidentStatus } from '../types/Incident'
import Button from './Button'
import Input from './Input'

const CreateIncidentForm: Component = () => {
  return (
    <Form
      initialValues={{ description: '', status: '', serviceId: '' }}
      validation={{ description: Yup.string().required() }}
    >
      <div class="flex flex-col">
        <div class="space-y-4">
          <Input name="description" label="Description" />
        </div>

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Create
        </Button>
      </div>
    </Form>
  )
}

export default CreateIncidentForm
