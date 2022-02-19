import { onCleanup } from 'solid-js'

const onClickOutside = (el: Element, accessor: () => any) => {
  const onClick = (e: MouseEvent) =>
    !el.contains(e.target as Node) && accessor?.()

  document.body.addEventListener('click', onClick)

  onCleanup(() => document.body.removeEventListener('click', onClick))
}

export default onClickOutside
