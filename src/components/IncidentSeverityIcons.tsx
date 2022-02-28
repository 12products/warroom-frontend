import { Component } from 'solid-js'
import { IncidentSeverity } from '../types/incident'

export const CriticalIncidentSeverityIcon: Component = () => (
  <div
    title="Critical Severity"
    class="flex justify-center items-center bg-zinc-500 font-bold text-zinc-800 rounded w-4 h-4"
  >
    <div>!</div>
  </div>
)

export const HighIncidentSeverityIcon: Component = () => (
  <div title="High Severity" class="flex items-end space-x-1 w-4 h-4">
    <div class="h-1/3 w-1 bg-zinc-500 rounded-sm"></div>
    <div class="h-2/3 w-1 bg-zinc-500 rounded-sm"></div>
    <div class="h-full w-1 bg-zinc-500 rounded-sm"></div>
  </div>
)

export const MediumIncidentSeverityIcon: Component = () => (
  <div title="Medium Severity" class="flex items-end space-x-1 w-4 h-4">
    <div class="h-1/3 w-1 bg-zinc-500 rounded-sm"></div>
    <div class="h-2/3 w-1 bg-zinc-500 rounded-sm"></div>
    <div class="h-full w-1 bg-zinc-700 rounded-sm"></div>
  </div>
)

export const LowIncidentSeverityIcon: Component = () => (
  <div title="Low Severity" class="flex items-end space-x-1 w-4 h-4">
    <div class="h-1/3 w-1 bg-zinc-500 rounded-sm"></div>
    <div class="h-2/3 w-1 bg-zinc-700 rounded-sm"></div>
    <div class="h-full w-1 bg-zinc-700 rounded-sm"></div>
  </div>
)

export const getIncidentSeverityIcon = (
  severity: IncidentSeverity
): Component => {
  switch (severity) {
    case IncidentSeverity.CRITICAL:
      return CriticalIncidentSeverityIcon
    case IncidentSeverity.HIGH:
      return HighIncidentSeverityIcon
    case IncidentSeverity.MEDIUM:
      return MediumIncidentSeverityIcon
    case IncidentSeverity.LOW:
    default:
      return LowIncidentSeverityIcon
  }
}
