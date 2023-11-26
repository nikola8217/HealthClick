import express from 'express';
import { SpecializationController } from '../controllers/specialization.controller';
import { createSpecializationRules } from '../validation/specialization.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.route('/')
    .post(requireAuth, createSpecializationRules, validateRequest, SpecializationController.createSpecialization)
    .get(requireAuth, SpecializationController.getSpecializations);
router.route('/:id')
    .get(requireAuth, SpecializationController.getSingleSpecialization)
    .put(requireAuth, SpecializationController.updateSpecialization)
    .delete(requireAuth, SpecializationController.deleteSpecialization);

const specializationRouter = router;

export { specializationRouter };


