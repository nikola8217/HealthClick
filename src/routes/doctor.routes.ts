import express from 'express';
import { createDoctorRules, updateDoctorRules } from '../validation/doctor.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { DoctorController } from '../controllers/doctor.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createDoctorRules, validateRequest, DoctorController.createDoctor)
    .get(requireAuth, DoctorController.getDoctors);
router.route('/:id')
    .get(requireAuth, DoctorController.getSingleDoctor)
    .put(requireAuth, updateDoctorRules, validateRequest, DoctorController.updateDoctor)
    .delete(requireAuth, DoctorController.deleteDoctor);

const doctorRouter = router;

export { doctorRouter };