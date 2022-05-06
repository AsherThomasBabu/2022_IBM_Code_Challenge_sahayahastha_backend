import { Router } from 'express';

import { sendOTP, verifyOTP } from '../controllers';

const router = Router();

router.post('/send', sendOTP);
router.post('/verify', verifyOTP);

export const OTPRouter = router;
