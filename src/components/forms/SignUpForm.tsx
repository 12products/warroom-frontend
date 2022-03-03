import { Component, createSignal, Show } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'
import { useNavigate } from 'solid-app-router'
import YupPassword from 'yup-password'
YupPassword(Yup) // extend yup

import Input from '../Input'
import Button from '../Button'
import { supabase } from '../../lib/supabase'
import ErrorAlert from '../ErrorAlert'

const SignUp: Component = () => {
  const navigate = useNavigate()
  const [authError, setAuthError] = createSignal('')

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validation={{
        email: Yup.string().email('Email must be valid').required(),
        password: Yup.string()
          .required('Please enter your password')
          .min(6, 'Password must contain 6 characters')
          .minLowercase(1, 'Password must contain 1 lowercase character')
          .minUppercase(1, 'Password must contain 1 uppercase character')
          .minNumbers(1, 'Password must contain 1 number')
          .minSymbols(1, 'Password must contain 1 special character'),
      }}
      onSubmit={async ({ values: { email, password } }) => {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          setAuthError(error.message)
          return
        }

        navigate('/onboard')
      }}
    >
      <div class="flex flex-col">
        <div class="space-y-4">
          <Input name="email" label="Email" />
          <Input name="password" label="Password" type="password" />
        </div>

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Sign Up
        </Button>
        <Show when={authError().length}>
          <ErrorAlert messageAccessor={authError} />
        </Show>
      </div>
    </Form>
  )
}

export default SignUp
