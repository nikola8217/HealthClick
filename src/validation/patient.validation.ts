import { body } from 'express-validator';
import moment from 'moment';
import { BadRequestError } from '../errors/bad-request-error';

export const createPatientRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('dateOfBirth')
        .notEmpty().withMessage('Date of birth is required')
        .custom(value => {
            if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
                throw new BadRequestError('Invalid date format. Use the format YYYY-MM-DD');
            }
            return true;
        })
];

export const updatePatientRules = [
    body('dateOfBirth')
        .optional()
        .custom(value => {
            if (!moment(value, 'YYYY-MM-DD', true).isValid()) {
                throw new BadRequestError('Invalid date format. Use the format YYYY-MM-DD');
            }
            return true;
        })
]