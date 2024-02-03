export interface Condominium {
    id: string;
    administrator_id: string;
    name: string;
    state: string;
    city: string;
    address: string;
    country: string;
    postal_code: string;
    phone: string;
    name_to_invoice: string;
    created_at: string;
    updated_at: string;
}

export interface CreateCondominium {
    name: string;
    state: string;
    city: string;
    address: string;
    country: string;
    postal_code: string;
    phone: string;
    name_to_invoice: string;
    initial_balance: number;
}

export interface CreateCondominiumResponse {
    condominium?: Condominium;
    message: string;
}

