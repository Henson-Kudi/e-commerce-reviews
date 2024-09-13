import { FilterReviewDTO, ICreateReviewDTO, QueryReviewDTO, UpdateReviewDTO } from "../../domain/dtos";
import MessageBroker from "../../infrastructure/providers";
import Repository from "../../infrastructure/repositories";
import CreateReview from "../use-cases/createReview";
import DeleteReviews from "../use-cases/deleteReviews";
import GetReviews from "../use-cases/findReviews";
import UpdateReviewUseCase from "../use-cases/updateReview";

// This file should bring your usecases together. eg: userService could be a combination of all user related use cases
export class ReviewsService {
    private readonly repository = new Repository()
    private readonly messageBroker = MessageBroker

    addReview(params: ICreateReviewDTO) {
        return new CreateReview(this.repository, this.messageBroker).execute(params)
    }

    updateReview(params: UpdateReviewDTO) {
        return new UpdateReviewUseCase(this.repository, this.messageBroker).execute(params)
    }

    deleteReviews(params: FilterReviewDTO) {
        return new DeleteReviews(this.repository, this.messageBroker).execute(params)
    }

    getReviews(params: QueryReviewDTO) {
        return new GetReviews(this.repository).execute(params)
    }
}

export default new ReviewsService()