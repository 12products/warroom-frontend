import { IncidentStatus } from './incident'

export type StatusMessage = {
  id: string
  text: string
  status: IncidentStatus
  createdAt: Date
}
