type MaintenanceStatus = 'WAITING' | 'IN_PROGRESS' | 'DONE'

export class UpdateMaintenanceDto {
  status: MaintenanceStatus
}
