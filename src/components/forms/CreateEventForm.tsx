import { Component, createSignal, Show } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation } from 'solid-urql'
import { useParams } from 'solid-app-router'

import Button from '../Button'
import Input from '../Input'
import ErrorAlert from '../ErrorAlert'
import FormToggle from '../FormToggle'
import { EventType, Event } from '../../types/event'

const CREATE_EVENT = `
  mutation ($input: CreateEventInput!) {
    createEvent(createEventInput: $input){
      id
    }
  }
`
type ArgProps = {
  event?: Event
}
type Props = {
  onCreateEvent: () => void
  reexecuteQuery: (args?: ArgProps) => void
}

const CreateEventForm: Component<Props> = ({
  onCreateEvent,
  reexecuteQuery,
}) => {
  const [createMutationResult, createEvent] = createMutation(CREATE_EVENT)
  const { id: incidentId } = useParams()

  const [causeEventSelected, setCauseEventSelected] = createSignal(false)
  const [resolutionEventSelected, setResolutionEventSelected] =
    createSignal(false)
  const [dectectionEventSelected, setDectectionSelected] = createSignal(false)

  const onSetDetectionEvent = (selected: boolean) => {
    if (selected) {
      setDectectionSelected(true)
      setCauseEventSelected(false)
      setResolutionEventSelected(false)
    } else {
      setDectectionSelected(false)
    }
  }

  const onSetCauseEvent = (selected: boolean) => {
    if (selected) {
      setCauseEventSelected(true)
      setDectectionSelected(false)
      setResolutionEventSelected(false)
    } else {
      setCauseEventSelected(false)
    }
  }

  const onSetResolutionEvent = (selected: boolean) => {
    if (selected) {
      setResolutionEventSelected(true)
      setCauseEventSelected(false)
      setDectectionSelected(false)
    } else {
      setResolutionEventSelected(false)
    }
  }

  const handleOnSubmit = async (
    form: FormType.Context<{
      message: string
      detectionEvent: boolean
      causeEvent: boolean
      resolutionEvent: boolean
    }>
  ) => {
    let eventType = EventType.GENERIC

    if (form.values.causeEvent) {
      eventType = EventType.CAUSE
    } else if (form.values.resolutionEvent) {
      eventType = EventType.RESOLUTION
    } else if (form.values.detectionEvent) {
      eventType = EventType.DETECTION
    }

    const variables = {
      input: {
        text: form.values.message,
        type: eventType,
        incidentId,
      },
    }
    const newEvent: Event = {
      id: '123',
      text: form.values.message,
      createdAt: new Date().toISOString(),
    }
    reexecuteQuery({ event: newEvent })
    await createEvent(variables)

    onCreateEvent()
  }

  return (
    <Form
      initialValues={{
        message: '',
        detectionEvent: false,
        causeEvent: false,
        resolutionEvent: false,
      }}
      validation={{
        message: Yup.string().required(),
        detectionEvent: Yup.boolean(),
        causeEvent: Yup.boolean(),
        resolutionEvent: Yup.boolean(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="space-y-4">
        <Input name="message" label="Message" />
        <FormToggle
          label="Cause Event"
          field="causeEvent"
          value={causeEventSelected}
          onSelected={onSetCauseEvent}
        />
        <FormToggle
          label="Detection Event"
          field="detectionEvent"
          value={dectectionEventSelected}
          onSelected={onSetDetectionEvent}
        />
        <FormToggle
          label="Resolution Event"
          field="resolutionEvent"
          value={resolutionEventSelected}
          onSelected={onSetResolutionEvent}
        />
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
