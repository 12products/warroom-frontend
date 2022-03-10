import { Component, createSignal, onMount, Show } from 'solid-js'
import { Form, FormType } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation } from 'solid-urql'
import { useParams } from 'solid-app-router'

import Button from '../Button'
import Input from '../Input'
import ErrorAlert from '../ErrorAlert'
import FormToggle from '../FormToggle'
import { HandleOnUpdateProps, EventType } from '../../types'
import flatpickr from 'flatpickr'

const CREATE_EVENT = `
  mutation ($input: CreateEventInput!) {
    createEvent(createEventInput: $input){
      id
      text
      eventDate
    }
  }
`

type Props = HandleOnUpdateProps & {
  onCreateEvent: () => void
}

const CreateEventForm: Component<Props> = ({
  onCreateEvent,
  handleOnUpdate,
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

  let datePicker: HTMLInputElement

  onMount(() => {
    flatpickr(datePicker as Node, {
      defaultDate: 'today',
      enableTime: true,
      altInput: true,
      altFormat: 'F j, Y  H:i',
      dateFormat: 'Y-m-d H:i',
    })
  })

  const handleOnSubmit = async (
    form: FormType.Context<{
      message: string
      detectionEvent: boolean
      causeEvent: boolean
      resolutionEvent: boolean
      eventDate: string
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
        eventDate: new Date(form.values.eventDate),
      },
    }
    await createEvent(variables)
    console.log('Data', createMutationResult().data)
    handleOnUpdate({ event: createMutationResult().data })
    onCreateEvent()
  }

  return (
    <Form
      initialValues={{
        message: '',
        detectionEvent: false,
        causeEvent: false,
        resolutionEvent: false,
        eventDate: new Date().toISOString(),
      }}
      validation={{
        message: Yup.string().required(),
        detectionEvent: Yup.boolean(),
        causeEvent: Yup.boolean(),
        resolutionEvent: Yup.boolean(),
        eventDate: Yup.string(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="space-y-4">
        <Input name="message" label="Message" />
        {/*@ts-ignore*/}
        <Input name="eventDate" label="Event Date" ref={datePicker} />
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
