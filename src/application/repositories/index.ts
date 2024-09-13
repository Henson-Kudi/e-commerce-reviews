import { Prisma, Review } from "@prisma/client";

// Define interfaces for your repositories. How to communicate with your database
export default interface IRepository {
    create(entity: Prisma.ReviewCreateArgs): Promise<Review>;
    update(entity: Prisma.ReviewUpdateArgs): Promise<Review | null>;
    deleteOne(id: Prisma.ReviewDeleteArgs): Promise<Review | null>;
    deleteMany(id: Prisma.ReviewDeleteManyArgs): Promise<Prisma.BatchPayload>;
    findOne(filter: Prisma.ReviewFindUniqueArgs): Promise<Review | null>;
    findMany(query: Prisma.ReviewFindManyArgs): Promise<Review[]>;
    count(filter: Prisma.ReviewCountArgs): Promise<number>;
}