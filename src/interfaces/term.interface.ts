export interface CreateOrUpdateTerm {
    patient: string;
    doctor: string;
    pricelistItem: string;
    time: Date
}

export interface FilterParams {
    doctor?: string;
    patient?: string;
    pricelist?: string;
    date?: Date;
}