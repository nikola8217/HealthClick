import { body } from 'express-validator';

export const createAndUpdatePricelistRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a numeric value'),
];