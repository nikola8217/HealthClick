import express from 'express';
import { createAndUpdatePatientRules } from '../validation/patient.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { PatientController } from '../controllers/patient.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createAndUpdatePatientRules, validateRequest, PatientController.create)
    .get(requireAuth, PatientController.getAll);
router.route('/:id')
    .get(requireAuth, PatientController.getSingle)
    .put(requireAuth, createAndUpdatePatientRules, validateRequest, PatientController.update)
    .delete(requireAuth, PatientController.delete);

const patientRouter = router;

export { patientRouter };