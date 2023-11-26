import express from 'express';
import { createAppointmentRules } from '../validation/appointment.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { AppointmentController } from '../controllers/appointment.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createAppointmentRules, validateRequest, AppointmentController.createAppointment)
    .get(requireAuth, AppointmentController.getAppointments);
router.route('/:id')
    .get(requireAuth, AppointmentController.getSingleAppointment)
    .put(requireAuth, AppointmentController.updateAppointment);
router.route('/updateStatus/:id')
    .put(requireAuth, AppointmentController.updateStatus);

const appointmentRouter = router;

export { appointmentRouter };