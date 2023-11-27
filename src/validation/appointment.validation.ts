import { body } from 'express-validator';

export const createAppointmentRules = [
    body('doctor').notEmpty().withMessage('Doctor is required'),
    body('patient').notEmpty().withMessage('Patient is required'),
    body('pricelistItem').notEmpty().withMessage('Pricelist item is required'),
    body('time')
        .notEmpty().withMessage('Time is required')
        .isISO8601().toDate().withMessage('Invalid date format. Use the format YYYY-MM-DD HH:mm')
];

export const updateStatusRules = [
    body('status')
        .notEmpty().withMessage('Status is required')
        .isIn(['pending', 'canceled', 'fulfilled']).withMessage('Invalid status. Must be one of: pending, canceled, fulfilled'),
]