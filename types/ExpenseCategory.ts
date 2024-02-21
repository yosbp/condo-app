export interface ExpenseCategory {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export interface CreateExpenseCategory {
    name: string;
    description: string;
}

export interface UpdateExpenseCategory {
    id: string;
    name: string;
    description: string;
}