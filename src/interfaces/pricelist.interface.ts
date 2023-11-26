export interface CreateOrUpdatePricelist {
    [key: string]: string | number | undefined;
    name?: string,
    price?: number
};