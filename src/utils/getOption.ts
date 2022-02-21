import { DropdownOption } from '../types/ui'

export const getOption = (id: string, options: DropdownOption[]) =>
  options.find((option) => option.id === id)
