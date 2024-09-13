import { FilterReviewDTO, PaginationDTO, QueryReviewDTO } from "../../../domain/dtos";

export function setupReviewFilter(filter?: FilterReviewDTO) {
    const filterQuery: Record<string, any> = {}

    if (!filter) {
        return filterQuery
    }

    if (filter.id) {
        filterQuery.id = Array.isArray(filter.id) ? {
            in: filter.id
        } : filter.id
    }

    if (filter.userId) {
        filterQuery.userId = Array.isArray(filter.userId) ? {
            in: filter.userId
        } : filter.userId
    }

    if (filter.productId) {
        filterQuery.productId = Array.isArray(filter.productId) ? {
            in: filter.productId
        } : filter.productId
    }

    if (filter.flagged) {
        filterQuery.flagged = filter.flagged
    }

    if (filter.rating) {
        const query: Record<string, any> = {}
        if (filter.rating.min) {
            query.gte = filter.rating.min
        }
        if (filter.rating.max) {
            query.lte = filter.rating.max
        }

        filterQuery.rating = query
    }
}

export function setupPagination(options?: PaginationDTO) {
    const DEFAULT_PAGE_NUM = 1
    const DEFAULT_LIMIT = 10

    const page = options && options.page && +options?.page > 0 ? +options.page : DEFAULT_PAGE_NUM ?? DEFAULT_PAGE_NUM

    const limit = options && options.limit && +options?.limit > 0 ? +options.limit : DEFAULT_LIMIT ?? DEFAULT_LIMIT

    const skip = (page - 1) * limit

    return {
        skip,
        limit,
        page: page
    }
}

export function setupReviewsQuery(query: QueryReviewDTO) {
    const filter = setupReviewFilter(query.filter)
    const pagination = setupPagination(query.options)

    return {
        filter,
        pagination
    }
}