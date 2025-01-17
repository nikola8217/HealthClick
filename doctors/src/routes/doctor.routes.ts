import express from 'express';
import { createOrUpdateDoctorRules } from '../validation/doctor.validation';
import { validateRequest, requireAuth } from '@healthclickapp/shared';
import { DoctorController } from '../controllers/doctor.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createOrUpdateDoctorRules, validateRequest, DoctorController.create)
    .get(requireAuth, DoctorController.getAll);
router.route('/:id')
    .get(requireAuth, DoctorController.getByID)
    .put(requireAuth, createOrUpdateDoctorRules, validateRequest, DoctorController.update)
    .delete(requireAuth, DoctorController.delete);
router.route('/specialization/:specializationId')
    .get(DoctorController.getDoctorsBySpecialization)
    .delete(DoctorController.deleteBySpecialization);

const doctorRouter = router;

export { doctorRouter };