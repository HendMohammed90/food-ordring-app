import { db } from "@/lib/prisma";
import MenuItem from "@/components/menu/MenuItem";

export default async function MenuPage() {
  try {
    // Include sizes and extras in the query using Prisma's include
    const products = await db.product.findMany({
      include: {
        sizes: true,    // Include all related sizes
        extras: true    // Include all related extras
      },
      orderBy: {
        order: 'asc'
      }
    });

    return (
      <main className="p-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
          {products.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <MenuItem key={product.id} item={product} />
              ))}
            </ul>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No menu items available at the moment.</p>
              <p className="text-sm text-muted-foreground mt-2">Please check back later!</p>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <main className="p-8">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8">Our Menu</h1>
          <p className="text-lg text-red-500">Sorry, we're having trouble loading the menu right now.</p>
          <p className="text-sm text-muted-foreground mt-2">Please try again later.</p>
        </div>
      </main>
    );
  }
}