import express from 'express';
import { SpecializationController } from '../controllers/specialization.controller';
import { createSpecializationRules } from '../validation/specialization.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.route('/')
    .post(requireAuth, createSpecializationRules, validateRequest, SpecializationController.create)
    .get(requireAuth, SpecializationController.getAll);
router.route('/:id')
    .get(requireAuth, SpecializationController.getSingle)
    .put(requireAuth, createSpecializationRules, validateRequest, SpecializationController.update)
    .delete(requireAuth, SpecializationController.delete);

const specializationRouter = router;

export { specializationRouter };


