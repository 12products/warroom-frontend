import { ServiceStatus } from '../types/service'

export const OperationalServiceStatusIcon = () => (
  <div class="bg-green-600 rounded-full w-4 h-4 shadow shadow-zinc-900/50"></div>
)

export const PartialOutageServiceStatusIcon = () => (
  <div class="bg-yellow-300 rounded-full w-4 h-4"></div>
)

export const MajorOutageServiceStatusIcon = () => (
  <div class="bg-red-600 rounded-full w-4 h-4"></div>
)

export const getServiceStatusIcon = (status: ServiceStatus) => {
  switch (status) {
    case ServiceStatus.OPERATIONAL:
      return OperationalServiceStatusIcon
    case ServiceStatus.PARTIAL_OUTAGE:
      return PartialOutageServiceStatusIcon
    case ServiceStatus.MAJOR_OUTAGE:
      return MajorOutageServiceStatusIcon
  }
}
