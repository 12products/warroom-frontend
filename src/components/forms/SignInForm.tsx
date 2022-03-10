import { Component, createSignal, Show } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'
import { useNavigate } from 'solid-app-router'

import Input from '../Input'
import Button from '../Button'
import { supabase } from '../../lib/supabase'
import ErrorAlert from '../ErrorAlert'

const SignIn: Component = () => {
  const navigate = useNavigate()
  const [authError, setAuthError] = createSignal('')

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validation={{
        email: Yup.string().required('Email is required'),
        password: Yup.string().required(),
      }}
      onSubmit={async ({ values: { email, password } }) => {
        const { error } = await supabase.auth.signIn({
          email,
          password,
        })

        if (error) {
          setAuthError(error.message)
          return
        }

        navigate('/incidents')
      }}
    >
      <div class="flex flex-col">
        <div class="space-y-4">
          <Input name="email" label="Email" />
          <Input name="password" label="Password" type="password" />
        </div>

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Sign In
        </Button>
        <Show when={authError().length}>
          <ErrorAlert messageAccessor={authError} />
        </Show>
      </div>
    </Form>
  )
}

export default SignIn
