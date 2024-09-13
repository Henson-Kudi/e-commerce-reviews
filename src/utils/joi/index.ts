import Joi from "joi";

export const CreateReviewJoiSchema = Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
    userId: Joi.string().required(),
    productId: Joi.string().required()
})

export const UpdateReviewJoiSchema = Joi.object({
    comment: Joi.string().optional(),
    rating: Joi.number().optional().min(1).max(5),
    userId: Joi.string().optional(),
    productId: Joi.string().optional(),
    flagged: Joi.boolean().optional(),
    id: Joi.string().optional()
}).or('id', 'userId', 'productId') // Require either `id` OR both `userId` and `productId` OR both
    .with('userId', 'productId')       // If `userId` is provided, `productId` must be present
    .with('productId', 'userId'); 