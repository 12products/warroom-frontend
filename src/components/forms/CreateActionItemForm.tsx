import { Component, Show } from 'solid-js'
import * as Yup from 'yup'
import { createMutation, createQuery } from 'solid-urql'
import { useParams } from 'solid-app-router'

import { Form, FormType } from '../../lib/form'
import Button from '../Button'
import Input from '../Input'
import FormDropdown from '../FormDropdown'
import { User } from '../../types/user'
import ErrorAlert from '../ErrorAlert'

const GET_USERS = `
  query {
    users {
      id
      firstName
    }
  }
`

const CREATE_ACTION_ITEM = `
  mutation ($input: CreateActionItemInput!) {
    createActionItem(createActionItemInput: $input){
      id
    }
  }
`

type Props = {
  onCreateActionItem: () => void
}

const CreateActionItemsForm: Component<Props> = ({ onCreateActionItem }) => {
  const [usersResult] = createQuery({ query: GET_USERS })

  const userOptions = () =>
    usersResult()?.users.map(({ id, firstName }: User) => ({
      id,
      label: firstName,
    })) || []

  const [createActionItemResult, createActionItem] =
    createMutation(CREATE_ACTION_ITEM)
  const { id: incidentId } = useParams()

  const handleOnSubmit = async (
    form: FormType.Context<{
      action: string
      ownerId: string
    }>
  ) => {
    const variables = {
      input: {
        text: form.values.action,
        ownerId: form.values.ownerId,
        incidentId,
      },
    }

    await createActionItem(variables)
    onCreateActionItem()
  }

  return (
    <Form
      initialValues={{
        action: '',
        ownerId: '',
      }}
      validation={{
        action: Yup.string().required(),
        ownerId: Yup.string().required(),
      }}
      onSubmit={async (form) => handleOnSubmit(form)}
    >
      <div class="space-y-4">
        <Input name="action" label="Action" />

        <FormDropdown
          label="Owner"
          options={userOptions}
          placeholder="Select owner..."
          field="ownerId"
        />
      </div>

      <Button type="submit" buttonClass="py-2 mt-8 font-semibold w-full">
        Create
      </Button>
      <Show when={createActionItemResult().error}>
        <ErrorAlert />
      </Show>
    </Form>
  )
}

export default CreateActionItemsForm
