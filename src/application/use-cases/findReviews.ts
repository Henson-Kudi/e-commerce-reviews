import { Review } from "@prisma/client";
import IUseCase from ".";
import { QueryReviewDTO } from "../../domain/dtos";
import IRepository from "../repositories";
import { ReturnTypeWithPagination } from "../../domain/valueObjects/returnType";
import { setupReviewsQuery } from "./helpers";

export default class GetReviews extends IUseCase<QueryReviewDTO, ReturnTypeWithPagination<Review[]>> {
    constructor(private readonly repository: IRepository) {
        super();
    }

    async execute(data: QueryReviewDTO): Promise<ReturnTypeWithPagination<Review[]>> {
        const query = setupReviewsQuery(data)

        const total = await this.repository.count({
            where: query.filter
        });

        const found = await this.repository.findMany({
            where: query.filter,
            take: query.pagination.limit,
            skip: query.pagination.skip,
        });

        return new ReturnTypeWithPagination<Review[]>(true, 'Success', {
            data: found,
            total,
            ...query.pagination
        })
    }
}