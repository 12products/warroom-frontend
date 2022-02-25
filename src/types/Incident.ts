import { Event } from './event'
import { Service } from './service'
import { StatusMessage } from './statusMessage'
import { DropdownOption } from './ui'
import { User } from './user'

export type Incident = {
  id: string
  title: string
  description: string
  status: IncidentStatus
  severity: IncidentSeverity
  incidentDate: Date
  actionItems: IncidentActionItem[]
  events: Event[]
  assignee: User
  statusMessage: StatusMessage[]
  service: Service
}

export enum IncidentStatus {
  INVESTIGATING = 'INVESTIGATING',
  IDENTIFIED = 'IDENTIFIED',
  MONITORING = 'MONITORING',
  RESOLVED = 'RESOLVED',
}

export enum IncidentSeverity {
  CRITICAL = 'CRITICAL',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export type IncidentActionItem = {
  id: string
  text: string
}

export const incidentStatusOptions: DropdownOption[] = Object.keys(
  IncidentStatus
).map((status) => ({
  id: status,
  label: status,
}))

export const incidentSeverityOptions: DropdownOption[] = Object.keys(
  IncidentSeverity
).map((severity) => ({
  id: severity,
  label: severity,
}))
