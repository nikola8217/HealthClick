import { body } from 'express-validator';

export const createAndUpdateTermRules = [
    body('doctor').notEmpty().withMessage('Doctor is required'),
    body('patient').notEmpty().withMessage('Patient is required'),
    body('pricelistItem').isNumeric().notEmpty().withMessage('Pricelist item is required'),
    body('time')
        .notEmpty().withMessage('Time is required')
        .isISO8601().toDate().withMessage('Invalid date format. Use the format YYYY-MM-DD HH:mm')
];