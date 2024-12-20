export interface UnitType{
    id: string;
    name: string;
    description: string;
    percentage: number;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUnitType{
    name: string;
    description: string;
    percentage: number;
}

export interface UnitTypeInvoice{
    id: string;
    name: string;
    percentage: number;
}