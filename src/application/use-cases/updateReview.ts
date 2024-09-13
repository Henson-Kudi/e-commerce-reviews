import { Review } from "@prisma/client";
import IUseCase from ".";
import { UpdateReviewDTO } from "../../domain/dtos";
import IRepository from "../repositories";
import IMessageBroker from "../providers";
import AppError from "../../domain/valueObjects/appError";
import { ResponseCodes } from "../../domain/enums/responseCode";
import { ReturnType } from "../../domain/valueObjects/returnType";
import { UpdateReviewJoiSchema } from "../../utils/joi";
import logger from "../../utils/logger";
import { reviewUpdated } from '../../utils/kafkaTopics.json'

export default class UpdateReviewUseCase extends IUseCase<UpdateReviewDTO, ReturnType<Review | null>> {
    constructor(private readonly repository: IRepository, private readonly messageBroker: IMessageBroker) {
        super();
    }

    async execute(input: UpdateReviewDTO): Promise<ReturnType<Review | null>> {
        const error = new AppError("Invalid input", ResponseCodes.BadRequest)

        // Validate input
        await this.validate(UpdateReviewJoiSchema, input)

        let review: Review | null = null;

        // Ensure review exists
        if (input.id) {
            review = await this.repository.findOne({
                where: {
                    id: input.id
                }
            })
        } else if (input.productId && input.userId) {
            review = await this.repository.findOne({
                where: {
                    userId_productId: {
                        userId: input.userId,
                        productId: input.productId
                    }
                }
            })
        }

        if (!review || (input.id && review.id !== input.id)) {
            error.message = "Could not find review to update"
            error.code = ResponseCodes.NotFound

            return new ReturnType(false, 'Could not find review to update', null, error)
        }

        const updatedReview = await this.repository.update({
            where: {
                id: review.id
            },
            data: input
        })

        // Publish message
        try {
            this.messageBroker.publish({
                topic: reviewUpdated,
                message: JSON.stringify(updatedReview)
            })
        } catch (err) {
            logger.error((err as Error).message, err)
        }

        return new ReturnType(true, 'Review updated successfully', updatedReview)
    }
}