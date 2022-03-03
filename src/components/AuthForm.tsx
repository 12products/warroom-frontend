import { Component, createSignal } from 'solid-js'

import AuthLayout from './layouts/AuthLayout'
import SignInForm from './forms/SignInForm'
import SignUpForm from './forms/SignUpForm'

export enum STATES {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up',
}

type Props = {
  state: STATES.SIGN_IN | STATES.SIGN_UP
}

const AuthForm: Component<Props> = ({ state: initialState }) => {
  const [getState, setState] = createSignal(initialState)

  return (
    <AuthLayout>
      <div class="bg-zinc-800 border border-zinc-700 rounded p-8 shadow shadow-zinc-900/50">
        {getState() === STATES.SIGN_IN && <SignInForm />}
        {getState() === STATES.SIGN_UP && <SignUpForm />}
      </div>

      <div class="text-zinc-500 text-center mt-4 text-sm">
        {getState() === STATES.SIGN_IN && (
          <span>
            Need an account?{' '}
            <span
              class="hover:text-green-500 hover:cursor-pointer font-semibold"
              onClick={() => setState(STATES.SIGN_UP)}
            >
              Sign up
            </span>
          </span>
        )}

        {getState() === STATES.SIGN_UP && (
          <span>
            Already have an account?{' '}
            <span
              class="hover:text-green-500 hover:cursor-pointer font-semibold"
              onClick={() => setState(STATES.SIGN_IN)}
            >
              Sign in
            </span>
          </span>
        )}
      </div>
    </AuthLayout>
  )
}

export default AuthForm
