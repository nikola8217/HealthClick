import express from 'express';
import { SpecializationController } from '../controllers/specialization.controller';
import { createOrUpdateSpecializationRules } from '../validation/specialization.validation';
import { validateRequest } from '@healthclickapp/shared';
import { requireAuth } from '@healthclickapp/shared';

const router = express.Router();

router.route('/')
    .post(requireAuth, createOrUpdateSpecializationRules, validateRequest, SpecializationController.create)
    .get(requireAuth, SpecializationController.getAll);
router.route('/:id')
    .get(requireAuth, SpecializationController.getByID)
    .put(requireAuth, createOrUpdateSpecializationRules, validateRequest, SpecializationController.update)
    .delete(requireAuth, SpecializationController.delete);

const specializationRouter = router;

export { specializationRouter };


