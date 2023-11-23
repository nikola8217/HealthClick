import express from 'express';
import { createAndUpdatePricelistRules } from '../validation/pricelist.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { PricelistController } from '../controllers/pricelist.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createAndUpdatePricelistRules, validateRequest, PricelistController.create)
    .get(requireAuth, PricelistController.getAll);
router.route('/:id')
    .get(requireAuth, PricelistController.getSingle)
    .put(requireAuth, createAndUpdatePricelistRules, validateRequest, PricelistController.update)
    .delete(requireAuth, PricelistController.delete);

const pricelistRouter = router;

export { pricelistRouter };