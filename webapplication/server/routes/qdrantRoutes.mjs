import {Router} from 'express';
import { qdrantControllers } from '../controllers/qdrantControllers.mjs';

const qdrantRouter = Router();

// Checking Existing Collections
qdrantRouter.route('/checkExistingCollections')
            .get(qdrantControllers.checkExistingCollections);

// Creating a Collection
qdrantRouter.route('/createCollection')
            .post(qdrantControllers.createCollection);

// Deleting a Collection
qdrantRouter.route('/deleteCollection')
            .delete(qdrantControllers.deleteCollection);

export default qdrantRouter;