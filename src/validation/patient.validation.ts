import { body } from 'express-validator';
import moment from 'moment';
import { BadRequestError } from '../errors/bad-request-error';

export const createAndUpdatePatientRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('dateOfBirth')
        .notEmpty().withMessage('Date of birth is required')
        .custom(value => {
            if (!moment(value, 'D.M.Y', true).isValid()) {
                throw new BadRequestError('Invalid date format. Use the format d.m.y');
            }
            return true;
        })
];