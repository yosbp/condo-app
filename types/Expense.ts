export interface Expense{
    id: string;
    expense_category_id: string;
    description: string;
    amount: number;
    date: Date;   
    create_at: Date;
    update_at: Date;
}

export interface CreateExpense{
    expense_category_id: string;
    description: string;
    amount: number;
    date: Date;
}

export interface CreateExpenseResponse{
    expenses: Expense[];
}

export interface UpdateExpense{
    id: string;
    description: string;
    amount: number;
    date: Date;
}