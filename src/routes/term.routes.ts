import express from 'express';
import { createAndUpdateTermRules } from '../validation/term.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { TermController } from '../controllers/term.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createAndUpdateTermRules, validateRequest, TermController.create)
//     .get(requireAuth, DoctorController.getAll);
// router.route('/:id')
//     .get(requireAuth, DoctorController.getSingle)
//     .put(requireAuth, createAndUpdateDoctorRules, validateRequest, DoctorController.update)
//     .delete(requireAuth, DoctorController.delete);

const termRouter = router;

export { termRouter };