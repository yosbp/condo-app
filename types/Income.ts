export interface Income{
    id: string;
    unit_id: string;
    description: string;
    method: string;
    bank: string | null;
    amount: number;
    date: Date;   
    create_at: Date;
    update_at: Date;
}

export interface CreateIncome{
    unit_id: string;
    description: string;
    method: string;
    bank: string | null;
    amount: number;
    date: Date;
}

export interface CreateIncomeResponse{
    incomes: Income[];
}