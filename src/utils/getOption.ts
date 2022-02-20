import { DropdownPropertyOption } from '../types/incident'

export const getOption = (id: string, options: DropdownPropertyOption[]) =>
  options.find((option) => option.id === id)
