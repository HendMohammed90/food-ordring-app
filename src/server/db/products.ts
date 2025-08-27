import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getBestSellers = cache(
    () => {
        return db.product.findMany({
            take: 3, // Only get first 3 products for the home page
            orderBy: {
                orders: {
                    _count: 'desc'
                }
            },
            include: {
                sizes: true,
                extras: true,
            },
            where: {
                orders: {
                    some: {}
                }
            }
        });
    },
    ['best-sellers'],
    {
        revalidate: 60,
        tags: ['best-sellers']
    }
);