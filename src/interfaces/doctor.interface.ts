export interface CreateOrUpdateDoctor {
    [key: string]: string | number | undefined;
    name?: string;
    education?: string;
    yearsOfExpirience?: number;
    yearOfEmployment?: number;
    specialization?: number;
}