import { NextFunction, Request, Response } from 'express';
import expressAdapter from '../../../adapters/expressAdapter';
import { ResponseCodes } from '../../../../domain/enums/responseCode';
import ReviewsService from '../../../../application/services';
import GetReviewController from '../../../http/controllers/getReviews';

export default async function getReviews(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result = await expressAdapter(
            req,
            new GetReviewController(ReviewsService)
        );

        if (!result.success) {
            throw result.error;
        }

        return res.status(ResponseCodes.Success).json(result);
    } catch (err) {
        next(err);
    }
}
