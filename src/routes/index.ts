import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

import searchRoute from './searchRoute';


router.get('/', (req: Request, res: Response) => {
  res.send('server is up and running');
});

router.use('/search', searchRoute);

export default router;