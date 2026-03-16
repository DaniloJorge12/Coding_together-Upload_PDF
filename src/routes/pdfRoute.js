import express from 'express';
import * as controller from '../controllers/pdfController.js';

const router = express.Router();

router.get('/pdf', controller.relatorioTodos);
router.get('/:id/pdf', controller.relatorioPorId);

export default router;
