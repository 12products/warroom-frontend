import { Component } from 'solid-js'

import AuthForm, { STATES } from '../components/AuthForm'

const SignIn: Component = () => {
  return <AuthForm state={STATES.SIGN_IN} />
}

export default SignIn
