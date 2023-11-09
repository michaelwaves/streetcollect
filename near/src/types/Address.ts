export interface Address {
    street: string;
    internal?: string;
    city: string;
    state?: string;
    country?: string;
    us: boolean;
    postalCode?: string;
};