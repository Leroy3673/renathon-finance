import { Router } from "express";
import qdrantRouter from './qdrantRoutes.mjs';

const domain = Router();


domain.use('/api/qdrant', qdrantRouter);

export default domain;