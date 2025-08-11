import { Extra, Product, Size, Category } from "../../prisma/generated/prisma";

export type ProductWithRelations = Product & {
    sizes: Size[];
    extras: Extra[];
};

export type CategoryWithProducts = Category & {
    products: ProductWithRelations[];
};