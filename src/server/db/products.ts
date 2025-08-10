import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getBestSellers =  cache(
    () => {
    return db.product.findMany({
        take: 3, // Only get first 3 products for the home page
        orderBy: {
            order: 'asc'
        },
        include: {
            sizes: true,
            extras: true,
        },
    });
}, ['best-sellers'], { revalidate: 60 });