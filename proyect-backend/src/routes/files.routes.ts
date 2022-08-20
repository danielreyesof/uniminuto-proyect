import { Router } from 'express';
const router = Router();

import * as filesCtrl from './../controllers/files.controller';

router.get('/download', filesCtrl.download);
router.get('/counter', filesCtrl.counter);

export default router;
