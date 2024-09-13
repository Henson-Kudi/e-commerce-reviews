import { Review } from "@prisma/client";
import RequestObject from "../../../utils/types/requestObject";
import IContoller from "./Icontroller";
import { ReturnType } from "../../../domain/valueObjects/returnType";
import AppError from "../../../domain/valueObjects/appError";
import { ResponseCodes } from "../../../domain/enums/responseCode";
import { ReviewsService } from "../../../application/services";

export default class UpdateReviewController implements IContoller<ReturnType<Review | null>> {
    constructor(private readonly reviewsService: ReviewsService) { }

    handle(req: RequestObject): Promise<ReturnType<Review | null>> {
        const authUserId = req.headers ? req.headers['user-id'] : '';

        if (!authUserId) {
            const error = new AppError('Not authorised', ResponseCodes.BadRequest);
            return Promise.resolve(
                new ReturnType(false, 'Not authorised', null, error)
            );
        }

        return this.reviewsService.updateReview({
            ...(req.body ?? {}),
            userId: authUserId,
            id: req.params.id
        });
    }
}