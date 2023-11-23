import { body } from 'express-validator';

export const createSpecializationRules = [
    body('name').notEmpty().withMessage('Name is required'),
];