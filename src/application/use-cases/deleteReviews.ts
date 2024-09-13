import IUseCase from ".";
import { FilterReviewDTO } from "../../domain/dtos";
import { ReturnType } from "../../domain/valueObjects/returnType";
import logger from "../../utils/logger";
import IMessageBroker from "../providers";
import IRepository from "../repositories";
import { setupReviewFilter } from "./helpers";
import {reviewsDeleted} from '../../utils/kafkaTopics.json'

export default class DeleteReviews extends IUseCase<FilterReviewDTO, ReturnType<{ count: number }>> {
    constructor(private readonly repository: IRepository, private readonly messageBroker: IMessageBroker) {
        super();
    }

    async execute(filter: FilterReviewDTO): Promise<ReturnType<{ count: number }>> {
        const query = setupReviewFilter(filter)

        const found = await this.repository.findMany({
            where: query
        })

        const deleted = await this.repository.deleteMany({
            where: query
        })

        // Publish message
        try {
            this.messageBroker.publish({
                topic: reviewsDeleted,
                message: JSON.stringify(found)
            })
        } catch (err) {
            logger.error((err as Error).message, err)
        }

        return new ReturnType(true, 'Success', deleted)
    }
}