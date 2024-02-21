export interface MaintenanceRecord{
    id: string;
    owner_id: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateMaintenanceRecord{
    description: string;
}