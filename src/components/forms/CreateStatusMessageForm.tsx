import { Component } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation } from 'solid-urql'
import { useParams } from 'solid-app-router'

import Button from '../Button'
import Input from '../Input'
import FormDropdown from '../FormDropdown'
import { incidentStatusOptions } from '../../types/incident'

const CREATE_STATUS_MESSAGE = `
  mutation ($input: CreateStatusMessageInput!) {
    createStatusMessage(createStatusMessageInput: $input){
      id
    }
  }
`
type Props = {
  onCreateStatusMessage: () => void
}

const CreateStatusMessageForm: Component<Props> = ({
  onCreateStatusMessage,
}) => {
  const [_, createStatusMessage] = createMutation(CREATE_STATUS_MESSAGE)
  const { id: incidentId, section } = useParams()

  const handleOnSubmit = async (
    form: FormType.Context<{
      text: string
      status: string
    }>
  ) => {
    const variables = {
      input: {
        text: form.values.text,
        status: form.values.status,
        incidentId,
      },
    }

    await createStatusMessage(variables)
    onCreateStatusMessage()
  }

  return (
    <Form
      initialValues={{
        text: '',
        status: '',
      }}
      validation={{
        text: Yup.string().required(),
        status: Yup.string().required(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="space-y-4">
        <Input name="text" label="Text" />

        <FormDropdown
          options={() => incidentStatusOptions}
          placeholder="Select status..."
          field="status"
        />
      </div>

      <Button type="submit" buttonClass="py-2 mt-8 font-semibold w-full">
        Create
      </Button>
    </Form>
  )
}

export default CreateStatusMessageForm
