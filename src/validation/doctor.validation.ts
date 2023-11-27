import { body } from 'express-validator';

export const createDoctorRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('education').notEmpty().withMessage('Education is required'),
    body('yearsOfExpirience').isNumeric().withMessage('Years of experience must be a numeric value'),
    body('yearOfEmployment').isNumeric().withMessage('Year of employment must be a numeric value'),
    body('specialization').notEmpty().withMessage('Specialization is required')
];

export const updateDoctorRules = [
    body('yearsOfExpirience').optional().isNumeric().withMessage('Years of experience must be a numeric value'),
    body('yearOfEmployment').optional().isNumeric().withMessage('Year of employment must be a numeric value'),
]