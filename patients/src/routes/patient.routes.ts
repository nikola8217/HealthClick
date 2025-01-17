import express from 'express';
import { createOrUpdatePatientRules } from '../validation/patient.validation';
import { validateRequest } from '@healthclickapp/shared';
import { requireAuth } from '@healthclickapp/shared';
import { PatientController } from '../controllers/patient.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createOrUpdatePatientRules, validateRequest, PatientController.create)
    .get(requireAuth, PatientController.getAll);
router.route('/:id')
    .get(requireAuth, PatientController.getByID)
    .put(requireAuth, createOrUpdatePatientRules, validateRequest, PatientController.update)
    .delete(requireAuth, PatientController.delete);

const patientRouter = router;

export { patientRouter };