export interface ReportedPayment{
    id: string;
    owner_id: string;
    amount: number;
    description: string;
    bank: string;
    is_verified: boolean;
    date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface CreateReportPayment{
    amount: number;
    description: string;
    bank: string;
    date: Date;
}