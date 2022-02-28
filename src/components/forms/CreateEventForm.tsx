import { Component, Show } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation } from 'solid-urql'
import { useParams } from 'solid-app-router'

import Button from '../Button'
import Input from '../Input'
import ErrorAlert from '../ErrorAlert'

const CREATE_EVENT = `
  mutation ($input: CreateEventInput!) {
    createEvent(createEventInput: $input){
      id
    }
  }
`

type Props = {
  onCreateEvent: () => void
}

const CreateEventForm: Component<Props> = ({ onCreateEvent }) => {
  const [createMutationResult, createEvent] = createMutation(CREATE_EVENT)
  const { id: incidentId } = useParams()

  const handleOnSubmit = async (
    form: FormType.Context<{
      message: string
    }>
  ) => {
    const variables = {
      input: {
        text: form.values.message,
        incidentId,
      },
    }

    await createEvent(variables)
    onCreateEvent()
  }

  return (
    <Form
      initialValues={{
        message: '',
      }}
      validation={{
        message: Yup.string().required(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="space-y-4">
        <Input name="message" label="Message" />
      </div>

      <Button type="submit" buttonClass="py-2 mt-8 font-semibold w-full">
        Create
      </Button>
      <Show when={createMutationResult().error}>
        <ErrorAlert />
      </Show>
    </Form>
  )
}

export default CreateEventForm
