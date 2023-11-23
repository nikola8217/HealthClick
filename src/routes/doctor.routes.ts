import express from 'express';
import { createAndUpdateDoctorRules } from '../validation/doctor.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { DoctorController } from '../controllers/doctor.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createAndUpdateDoctorRules, validateRequest, DoctorController.create)
    .get(requireAuth, DoctorController.getAll);
router.route('/:id')
    .get(requireAuth, DoctorController.getSingle)
    .put(requireAuth, createAndUpdateDoctorRules, validateRequest, DoctorController.update)
    .delete(requireAuth, DoctorController.delete);

const doctorRouter = router;

export { doctorRouter };