import RequestObject from "../../../utils/types/requestObject";
import IContoller from "./Icontroller";
import { ReturnType } from "../../../domain/valueObjects/returnType";
import AppError from "../../../domain/valueObjects/appError";
import { ResponseCodes } from "../../../domain/enums/responseCode";
import { ReviewsService } from "../../../application/services";

export default class DeleteReviewController implements IContoller<ReturnType<{ count: number } | undefined>> {
    constructor(private readonly reviewsService: ReviewsService) { }

    handle(req: RequestObject): Promise<ReturnType<{ count: number } | undefined>> {
        const authUserId = req.headers ? req.headers['user-id'] : '';

        if (!authUserId) {
            const error = new AppError('Not authorised', ResponseCodes.BadRequest);
            return Promise.resolve(
                new ReturnType(false, 'Not authorised', undefined, error)
            );
        }

        return this.reviewsService.deleteReviews({
            ...(req.query ?? {}),
            userId: authUserId,
            id: req.params.id
        });
    }
}