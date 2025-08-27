import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getCategories = cache(
    () => {
        return db.category.findMany({
            include: {
                products: {
                    take: 4, // Limit to 4 products per category
                    include: {
                        sizes: true,    // Include all related sizes
                        extras: true    // Include all related extras
                    },
                    orderBy: {
                        order: 'asc'
                    }
                }
            },
            orderBy: {
                order: 'asc'
            }
        });
    },
    ['categories'],
    {
        revalidate: 60,
        tags: ['categories']
    }
);