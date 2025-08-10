import { Extra, Product, Size } from "../../prisma/generated/prisma";

export type ProductWithRelations = Product & {
    sizes: Size[];
    extras: Extra[];
};