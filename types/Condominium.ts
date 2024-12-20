import type { UnitTypeInvoice } from './UnitType';

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

export interface UpdateCondominium {
  name: string;
  state: string;
  city: string;
  address: string;
  postal_code: string;
  phone: string;
  name_to_invoice: string;
}

export interface CreateCondominiumResponse {
  condominium?: Condominium;
  message: string;
}

export interface CondominiumResponse {
  condominium: Condominium;
  message: string;
}

export interface CondominiumsSelectResponse {
  id: string;
  name: string;
  units: UnitSelectResponse[];
}

export interface UnitSelectResponse {
  id: string;
  name: string;
}

export interface DataToInvoice {
  condominium: {
    id: string;
    name_to_invoice: string;
    phone: string;
    email: string;
    image_url: string;
  };
  expenses: {
    id: string;
    name: string;
    description: string;
    amount: number;
    date: string;
    category: string;
  }[];
  units_types: UnitTypeInvoice[];
}
