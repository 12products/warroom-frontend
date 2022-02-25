import { Component } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation } from 'solid-urql'
import { useParams } from 'solid-app-router'

import Button from '../Button'
import Input from '../Input'

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
  const [_, createEvent] = createMutation(CREATE_EVENT)
  const { id: incidentId } = useParams()

  const handleOnSubmit = async (
    form: FormType.Context<{
      text: string
    }>
  ) => {
    const variables = {
      input: {
        text: form.values.text,
        incidentId,
      },
    }

    await createEvent(variables)
    onCreateEvent()
  }

  return (
    <Form
      initialValues={{
        text: '',
      }}
      validation={{
        text: Yup.string().required(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="space-y-4">
        <Input name="text" label="Text" />
      </div>

      <Button type="submit" buttonClass="py-2 mt-8 font-semibold w-full">
        Create
      </Button>
    </Form>
  )
}

export default CreateEventForm
