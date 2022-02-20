import { DropdownPropertyOption } from '../types/Incident'

export const getOption = (id: string, options: DropdownPropertyOption[]) =>
  options.find((option) => option.id === id)
