import express from 'express';
import { createPatientRules } from '../validation/patient.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { PatientController } from '../controllers/patient.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createPatientRules, validateRequest, PatientController.createPatient)
    .get(requireAuth, PatientController.getPatients);
router.route('/:id')
    .get(requireAuth, PatientController.getSinglePatient)
    .put(requireAuth, PatientController.updatePatient)
    .delete(requireAuth, PatientController.deletePatient);

const patientRouter = router;

export { patientRouter };