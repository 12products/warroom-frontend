import { Component } from 'solid-js'

import AuthForm, { STATES } from '../components/AuthForm'

const SignUp: Component = () => {
  return <AuthForm state={STATES.SIGN_UP} />
}

export default SignUp
