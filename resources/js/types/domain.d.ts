export interface Customer {
    id: number;
    type: "individual" | "company"; // adjust if more types exist
    name: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    city: string;
    nif: string;
    rccm: string;
    idnat: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
}

export interface InvoiceRequest {
    customer_id: number
    type: string
    invoice_number: string
    invoice_date: Date
    due_date: Date
    payment_method: string
    tax: number
    discount: number
    subtotal: number
    total: number
    items: {
        description: string
        quantity: number
        unit_price: number
        tax_rate: number
        total: number
    }[]
}
