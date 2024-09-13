// You can modify this file the way you like but make sure to export the router as default so that it initialised in index.ts
import { Router } from 'express';
import getReviews from './handlers/getReviews';
import addReview from './handlers/addReview';
import updateReview from './handlers/updateReview';
import deleteReviews from './handlers/deleteReviews';

const router = Router();

// Define your routes here

router.route('/').get(getReviews).post(addReview).put(updateReview).delete(deleteReviews)

router.route('/:id').put(updateReview).delete(deleteReviews)

export default router;
