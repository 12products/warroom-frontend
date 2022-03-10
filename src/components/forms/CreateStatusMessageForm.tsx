import { Component, Show } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation } from 'solid-urql'
import { useParams } from 'solid-app-router'

import Button from '../Button'
import Input from '../Input'
import FormDropdown from '../FormDropdown'
import ErrorAlert from '../ErrorAlert'
import { HandleOnUpdateProps, incidentStatusOptions } from '../../types'

const CREATE_STATUS_MESSAGE = `
  mutation ($input: CreateStatusMessageInput!) {
    createStatusMessage(createStatusMessageInput: $input){
      id
      status
      createdAt
      text
    }
  }
`

type Props = HandleOnUpdateProps & {
  onCreateStatusMessage: () => void
}

const CreateStatusMessageForm: Component<Props> = ({
  handleOnUpdate,
  onCreateStatusMessage,
}) => {
  const [createStatusMutationResult, createStatusMessage] = createMutation(
    CREATE_STATUS_MESSAGE
  )
  const { id: incidentId } = useParams()

  const handleOnSubmit = async (
    form: FormType.Context<{
      message: string
      status: string
    }>
  ) => {
    const variables = {
      input: {
        text: form.values.message,
        status: form.values.status,
        incidentId,
      },
    }

    await createStatusMessage(variables)
    handleOnUpdate({ statusMessage: createStatusMutationResult().data })
    onCreateStatusMessage()
  }

  return (
    <Form
      initialValues={{
        message: '',
        status: '',
      }}
      validation={{
        message: Yup.string().required(),
        status: Yup.string().required(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="space-y-4">
        <FormDropdown
          label="Status"
          options={() => incidentStatusOptions}
          placeholder="Select status..."
          field="status"
        />

        <Input name="message" label="Message" />
      </div>

      <Button type="submit" buttonClass="py-2 mt-8 font-semibold w-full">
        Create
      </Button>
      <Show when={createStatusMutationResult().error}>
        <ErrorAlert />
      </Show>
    </Form>
  )
}

export default CreateStatusMessageForm
