import { Review } from "@prisma/client";
import IUseCase from ".";
import { ReturnType } from "../../domain/valueObjects/returnType";
import { ICreateReviewDTO } from "../../domain/dtos";
import IRepository from "../repositories";
import IMessageBroker from "../providers";
import { CreateReviewJoiSchema } from "../../utils/joi";
import AppError from "../../domain/valueObjects/appError";
import { ResponseCodes } from "../../domain/enums/responseCode";
import { reviewCreated } from "../../utils/kafkaTopics.json";
import logger from "../../utils/logger";

export default class CreateReview extends IUseCase<ICreateReviewDTO, ReturnType<Review | null>> {
    constructor(
        private readonly repository: IRepository,
        private readonly messageBroker: IMessageBroker
    ) {
        super();
    }

    async execute(input: ICreateReviewDTO): Promise<ReturnType<Review | null>> {
        // validate input
        await this.validate(CreateReviewJoiSchema, input);
        // Ensure user had not already reviewed given product
        const found = await this.repository.findOne({
            where: {
                userId_productId: {
                    productId: input.productId,
                    userId: input.userId
                }
            }
        });

        if (found) {
            const error = new AppError("You have already reviewed this product", ResponseCodes.BadRequest)

            return new ReturnType(false, "You have already reviewed this product", null, error)
        }

        // create review
        const review = await this.repository.create({
            data: input
        });

        // Publish review to message broker
        try {
            this.messageBroker.publish({
                message: JSON.stringify(review),
                topic: reviewCreated
            });
        } catch (err) {
            logger.error((err as Error).message, err)
        }

        return new ReturnType(true, "Review created successfully", review)
    }
}