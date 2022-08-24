import { Router } from 'express';
const router = Router();

import * as authCtrl from './../controllers/auth.controller';
import { authJwt, verifySignup } from './../middlewares';

router.post('/signup', [verifySignup.checkDuplicatedEmail], authCtrl.signup);
router.post('/signin', authCtrl.signin);
router.post('/signout', authCtrl.logout);
router.get('/verifytoken', authJwt.verifyToken);

export default router;
