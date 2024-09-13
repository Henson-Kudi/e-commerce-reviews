// Define how data will be transfered
export type Rating = 1 | 2 | 3 | 4 | 5;

export type ICreateReviewDTO = {
    comment: string
    userId: string
    productId: string
    rating: Rating
}

export type UpdateReviewDTO = {
    comment?: string
    id?: string
    userId?: string
    productId?: string
    rating?: Rating
} // We can only change rating or comment

export type FilterReviewDTO = {
    id?: string | string[]
    productId?: string | string[]
    userId?: string | string[]
    rating?: { min?: Rating, max?: Rating }
    flagged?: boolean
}

export type PaginationDTO = {
    page?: number
    limit?: number
}

export type QueryReviewDTO = {
    filter?: FilterReviewDTO
    options?: PaginationDTO
}