import { Component } from 'solid-js'

type Props = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  buttonClass?: string
}

const Button: Component<Props> = ({
  onClick,
  children,
  buttonClass = '',
  type = 'button',
}) => {
  return (
    <button
      class={`bg-green-500 rounded px-4 py-1 tracking-wider hover:cursor-pointer hover:bg-green-600 ${buttonClass}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
