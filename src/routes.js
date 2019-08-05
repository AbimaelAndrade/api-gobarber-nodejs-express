import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => res.json({ message: 'Hello Rocketseat' }));

export default router;
