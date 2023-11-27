export interface CreateOrUpdateAppointment {
    [key: string]: string | Date | undefined;
    patient?: string;
    doctor?: string;
    pricelistItem?: string;
    time?: Date;
}
export interface FilterParams {
    doctor?: string;
    patient?: string;
    pricelistItem?: string;
}