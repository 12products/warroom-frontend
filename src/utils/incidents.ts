import { IncidentSeverity } from '../types/incident'

export const getHigherSeverity = (
  severityA: IncidentSeverity,
  severityB: IncidentSeverity | null
): IncidentSeverity => {
  if ([severityA, severityB].some(() => IncidentSeverity.CRITICAL)) {
    return IncidentSeverity.CRITICAL
  }

  if ([severityA, severityB].some(() => IncidentSeverity.HIGH)) {
    return IncidentSeverity.HIGH
  }

  if ([severityA, severityB].some(() => IncidentSeverity.MEDIUM)) {
    return IncidentSeverity.MEDIUM
  }

  return IncidentSeverity.LOW
}
