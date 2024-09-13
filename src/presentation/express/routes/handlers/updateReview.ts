import { NextFunction, Request, Response } from 'express';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';
import ReviewsService from '../../../../application/services';
import UpdateReviewController from '../../../http/controllers/updateReviews';

export default async function updateReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await expressAdapter(
            req,
            new UpdateReviewController(ReviewsService)
        );

        if (!result.success) {
            throw result.error;
        }

        return res.status(ResponseCodes.Success).json(result);
    } catch (err) {
        next(err);
    }
}
