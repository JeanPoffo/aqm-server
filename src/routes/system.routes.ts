import { Router } from 'express';

const systemRouter = Router();

systemRouter.get('/health', (_, response) => response.json({ status: 'OK' }));

export default systemRouter;
