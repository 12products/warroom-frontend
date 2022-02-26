import { Component, createSignal, Show } from 'solid-js'
import { CreateModalProps } from '../../types/ui'
import Modal from './Modal'

interface CreateErrorAlertProps {
  message?: string
}

const ErrorAlert: Component<CreateErrorAlertProps> = ({
  message = 'Something went wrong. Please try again',
}) => {
  return <div class="text-xs text-red-500 mt-2 text-center">{message}</div>
}

export default ErrorAlert
