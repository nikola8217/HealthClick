import { body } from 'express-validator';
import moment from 'moment';
import { BadRequestError } from '@healthclickapp/shared';

export const createOrUpdatePatientRules = [
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
