export interface Unit{
    id: string;
    condominium_id: string;
    unit_number: string;
    owner_name: string;
    balance: number;
    type: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUnit{
    unit_type_id: string;
    unit_number: string;
    owner_name: string;
    owner_phone: string;
    owner_email: string;
    type: string;
    balance: number;
}

export interface CreateUnitResponse{
    unit?: Unit;
    message: string;
}