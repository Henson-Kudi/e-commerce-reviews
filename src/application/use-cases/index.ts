// Manage your use cases in this folder
import Joi from 'joi';

// Manage your use cases in this folder
export default abstract class IUseCase<Input = unknown, Output = unknown> {
    abstract execute(input: Input): Promise<Output>;

    async validate(schema: Joi.Schema, data: unknown): Promise<void> {
        await schema.validateAsync(data, { abortEarly: false });
    }
}
