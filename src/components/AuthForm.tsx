import { Component, createSignal } from 'solid-js'
import { Link } from 'solid-app-router'

import Logo from '../components/Logo'
import SignInForm from './SignInForm'
import SignUpForm from '../components/SignUpForm'

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
    <div class="flex flex-col h-screen items-center my-10">
      <Logo />

      <div class="mt-20 w-1/3">
        <h1 class="font-bold text-xl">{getState()}</h1>

        <div class="bg-zinc-700 bg-opacity-75 p-7 rounded mt-2 shadow-2xl">
          {getState() === STATES.SIGN_IN && <SignInForm />}
          {getState() === STATES.SIGN_UP && <SignUpForm />}
        </div>

        <div class="text-zinc-400 text-center mt-4">
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
                Log in
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm
