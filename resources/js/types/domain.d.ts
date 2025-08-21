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
