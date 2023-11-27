import express from 'express';
import { createPricelistItemRules, updatePricelistItemRules } from '../validation/pricelist.validation';
import { validateRequest } from '../middlewares/validate-request';
import { requireAuth } from '../middlewares/require-auth';
import { PricelistController } from '../controllers/pricelist.controller';

const router = express.Router();

router.route('/')
    .post(requireAuth, createPricelistItemRules, validateRequest, PricelistController.createPricelistItem)
    .get(requireAuth, PricelistController.getPricelistItems);
router.route('/:id')
    .get(requireAuth, PricelistController.getSinglePricelistItem)
    .put(requireAuth, updatePricelistItemRules, validateRequest, PricelistController.updatePricelistItem)
    .delete(requireAuth, PricelistController.deletePricelistItem);

const pricelistRouter = router;

export { pricelistRouter };