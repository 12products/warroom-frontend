import { IncidentSeverity } from '../types/incident'

export const getHigherSeverity = (
  severityA: IncidentSeverity,
  severityB: IncidentSeverity | null
): IncidentSeverity => {
  if (
    [severityA, severityB].some(
      (severity) => severity === IncidentSeverity.CRITICAL
    )
  ) {
    return IncidentSeverity.CRITICAL
  }

  if (
    [severityA, severityB].some(
      (severity) => severity === IncidentSeverity.HIGH
    )
  ) {
    return IncidentSeverity.HIGH
  }

  if (
    [severityA, severityB].some(
      (severity) => severity === IncidentSeverity.MEDIUM
    )
  ) {
    return IncidentSeverity.MEDIUM
  }

  return IncidentSeverity.LOW
}

export const getIncidentStyles = (
  severity: IncidentSeverity | null
): string[] => {
  if (
    severity === IncidentSeverity.CRITICAL ||
    severity === IncidentSeverity.HIGH
  ) {
    return ['bg-red-500', 'border-red-500']
  }

  if (
    severity === IncidentSeverity.MEDIUM ||
    severity === IncidentSeverity.LOW
  ) {
    return ['bg-yellow-400', 'border-yellow-400']
  }

  return ['bg-green-500', 'border-green-500']
}
