import { body } from 'express-validator';

export const createOrUpdateSpecializationRules = [
    body('name').notEmpty().withMessage('Name is required'),
];