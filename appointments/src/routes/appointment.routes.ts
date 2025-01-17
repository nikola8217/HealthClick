import express from 'express';
import { createAppointmentRules, updateStatusRules } from '../validation/appointment.validation';
import { validateRequest, requireAuth } from '@healthclickapp/shared';
import { AppointmentController } from '../controllers/appointment.cotroller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createAppointmentRules, validateRequest, AppointmentController.create)
    .get(requireAuth, AppointmentController.getAll);
router.route('/:id')
    .get(requireAuth, AppointmentController.getbyID)
    .put(requireAuth, createAppointmentRules, validateRequest, AppointmentController.update)
    .delete(requireAuth, AppointmentController.delete)
router.route('/updateStatus/:id')
    .patch(requireAuth, updateStatusRules, validateRequest, AppointmentController.updateStatus)
router.route('/patient/:patientId')
    .delete(AppointmentController.deleteByPatient)
router.route('/doctor/:doctorId')
    .delete(AppointmentController.deleteByDoctor)

const appointmentRouter = router;

export { appointmentRouter };