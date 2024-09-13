import { Review } from "@prisma/client";
import RequestObject from "../../../utils/types/requestObject";
import IContoller from "./Icontroller";
import { ReturnTypeWithPagination } from "../../../domain/valueObjects/returnType";
import AppError from "../../../domain/valueObjects/appError";
import { ResponseCodes } from "../../../domain/enums/responseCode";
import { ReviewsService } from "../../../application/services";

export default class GetReviewController implements IContoller<ReturnTypeWithPagination<Review[]>> {
    constructor(private readonly reviewsService: ReviewsService) { }

    handle(req: RequestObject): Promise<ReturnTypeWithPagination<Review[]>> {
        const authUserId = req.headers ? req.headers['user-id'] : '';

        if (!authUserId) {
            const error = new AppError('Not authorised', ResponseCodes.BadRequest);
            return Promise.resolve(
                new ReturnTypeWithPagination(false, 'Not authorised', undefined, error)
            );
        }

        return this.reviewsService.getReviews({
            filter: {
                ...(req.query ?? {}),
                userId: authUserId
            },
            options: {
                ...(req.query ?? {})
            }
        });
    }
}