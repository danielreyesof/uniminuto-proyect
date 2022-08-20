import { Router } from 'express';
const router = Router();

import * as pdfCtrl from './../controllers/pdf.controller';

router.post('/generate', pdfCtrl.generate);

export default router;
