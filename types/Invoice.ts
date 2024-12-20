export interface Invoice{
    id: string;
    condominium_id: string;
    description: string;
    amount: number;
    reserve_fund: number;
    total_amount: number;
    month: string;
    year: string;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface InvoiceCreateBody{
    condominium_id: string;
    description: string;
    amount: number;
    reserve_fund: number;
    total_amount: number;
    month: string;
    year: string;
    due_date: string;
    expenses: string[];
}