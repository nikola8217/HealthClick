export interface CreateOrUpdatePatient {
    [key: string]: string | Date | undefined;
    name?: string,
    address?: string,
    dateOfBirth?: Date
};