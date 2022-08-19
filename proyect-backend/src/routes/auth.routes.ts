import { Router } from 'express';
const router = Router();

import * as authCtrl from './../controllers/auth.controller';
import { authJwt, verifySignup } from './../middlewares';

router.post('/signup', [verifySignup.checkDuplicatedEmail], authCtrl.signup);
router.post('/signin', authCtrl.signin);
router.post('/logout', authCtrl.logout);
router.post('/verifytoken', authJwt.verifyToken);

export default router;
