import { Component } from 'solid-js'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'

import Input from './Input'
import Button from './Button'
import { supabase } from '../lib/supabase'

const SignUp: Component = () => {
  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validation={{
        email: Yup.string().required(),
        password: Yup.string().required(),
      }}
      onSubmit={async ({ values: { email, password } }) => {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) {
          throw error
        }
      }}
    >
      <div class="flex flex-col">
        <div class="space-y-4">
          <Input name="email" label="Email" labelClass="text-zinc-300" />

          <Input
            name="password"
            label="Password"
            type="password"
            labelClass="text-zinc-300"
          />
        </div>

        <Button type="submit" buttonClass="py-2 mt-8 font-semibold">
          Sign Up
        </Button>
      </div>
    </Form>
  )
}

export default SignUp
