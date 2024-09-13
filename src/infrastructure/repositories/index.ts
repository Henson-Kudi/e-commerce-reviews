import { Prisma, Review } from "@prisma/client";
import IRepository from "../../application/repositories";
import database from "../database";

// Implementation of all database repositories defined in application/repositories
export default class Repository implements IRepository {
    create(entity: Prisma.ReviewCreateArgs): Promise<Review> {
        return database.review.create(entity);
    }
    update(entity: Prisma.ReviewUpdateArgs): Promise<Review | null> {
        return database.review.update(entity);
    }
    deleteOne(id: Prisma.ReviewDeleteArgs): Promise<Review | null> {
        return database.review.delete(id);
    }
    deleteMany(id: Prisma.ReviewDeleteManyArgs): Promise<Prisma.BatchPayload> {
        return database.review.deleteMany(id);
    }
    findOne(filter: Prisma.ReviewFindUniqueArgs): Promise<Review | null> {
        return database.review.findUnique(filter);
    }
    findMany(query: Prisma.ReviewFindManyArgs): Promise<Review[]> {
        return database.review.findMany(query);
    }

    count(filter: Prisma.ReviewCountArgs): Promise<number> {
        return database.review.count(filter);
    }

}