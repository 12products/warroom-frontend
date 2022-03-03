import { Component, createSignal, Show } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'
import { createMutation } from 'solid-urql'

import Input from '../Input'
import Button from '../Button'
import FormDropdown from '../FormDropdown'
import { Service, serviceStatusOptions } from '../../types/service'
import ErrorAlert from '../ErrorAlert'
import FormToggle from '../FormToggle'

const UPDATE_SERVICE_MUTATION = `
  mutation($input: UpdateServiceInput!) {
    updateService(updateServiceInput: $input) {
      id
    }
  }
`

type Props = {
  service: Service
  onUpdateService: () => void
}

const UpdateServiceForm: Component<Props> = ({ service, onUpdateService }) => {
  const [updateServiceResult, updateService] = createMutation(
    UPDATE_SERVICE_MUTATION
  )

  const [privateStatus, setPrivateStatus] = createSignal(service.private)

  const onPrivateStatusSelected = (selected: boolean) => {
    setPrivateStatus(selected)
  }

  return (
    <Form
      initialValues={{
        name: service.name || '',
        description: service.description || '',
        link: service.link || '',
        status: service.status || '',
        private: service.private,
      }}
      validation={{
        name: Yup.string(),
        description: Yup.string(),
        link: Yup.string(),
        status: Yup.string(),
        private: Yup.string(),
      }}
      onSubmit={async ({
        values: { name, description, link, status, private: privateStatus },
      }) => {
        await updateService({
          input: {
            id: service.id,
            name,
            description,
            link,
            status,
            private: privateStatus,
          },
        })
        onUpdateService()
      }}
    >
      <div class="flex flex-col">
        <div class="space-y-4">
          <Input name="name" label="Name" />

          <Input name="description" label="Description" />

          <Input name="link" label="Link" />

          <FormDropdown
            label="Status"
            options={() => serviceStatusOptions}
            placeholder="Select status..."
            field="status"
          />

          <FormToggle
            label="Private"
            field="private"
            value={privateStatus}
            onSelected={onPrivateStatusSelected}
          />
        </div>

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Update Service
        </Button>

        <Show when={updateServiceResult().error}>
          <ErrorAlert />
        </Show>
      </div>
    </Form>
  )
}

export default UpdateServiceForm
