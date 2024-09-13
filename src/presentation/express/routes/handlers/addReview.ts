import { NextFunction, Request, Response } from 'express';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';
import AddReviewController from '../../../http/controllers/addReview';
import ReviewsService from '../../../../application/services';

export default async function addReview(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await expressAdapter(
            req,
            new AddReviewController(ReviewsService)
        );

        if (!result.success) {
            throw result.error;
        }

        return res.status(ResponseCodes.Success).json(result);
    } catch (err) {
        next(err);
    }
}
