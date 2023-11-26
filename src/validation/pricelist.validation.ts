import { body } from 'express-validator';

export const createPricelistItemRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a numeric value'),
];