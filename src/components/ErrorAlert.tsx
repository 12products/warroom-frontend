import { Accessor, Component, createSignal, Show } from 'solid-js'

interface CreateErrorAlertProps {
  messageAccessor?: Accessor<string>
}

const ErrorAlert: Component<CreateErrorAlertProps> = ({ messageAccessor }) => {
  const errorMessage = messageAccessor
    ? messageAccessor
    : () => 'Something went wrong. Please try again'
  return (
    <div class="text-xs text-red-500 mt-2 text-center">{errorMessage()}</div>
  )
}

export default ErrorAlert
