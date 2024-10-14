import express from 'express'
import { createOrder,getOrder } from '../controllers/payment.controllers.js';

const router = express.Router();

router.post('/',createOrder)
router.get('/:paymentId',getOrder)

export default router;