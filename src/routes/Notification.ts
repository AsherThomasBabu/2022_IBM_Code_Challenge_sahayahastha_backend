import { Router } from 'express';

import { createNotification, getNotifications } from '../controllers';

const router = Router();

router.route('/').get(getNotifications).post(createNotification);
