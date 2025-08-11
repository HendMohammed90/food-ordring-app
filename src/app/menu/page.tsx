import { db } from "@/lib/prisma";
import MenuItem from "@/components/menu/MenuItem";
import MainHeading from "@/components/main-heading";
import { getCategories } from "@/server/db/categories";

export default async function MenuPage() {
  try {
    // Fetch categories with their products, including sizes and extras
    const categories = await getCategories();

    return (
      <main className="p-8">
        <div className="container mx-auto ">
          <MainHeading subTitle="" title="Our Menu" />
          {categories.length > 0 ? (
            <div className="space-y-16">
              {categories.map((category) => (
                <section key={category.id} className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold text-primary mb-4">{category.name}</h2>
                    <div className="w-32 h-1 bg-primary mx-auto rounded-full"></div>
                  </div>
                  {category.products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                      {category.products.map((product) => (
                        <MenuItem key={product.id} item={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No items available in this category.</p>
                    </div>
                  )}
                </section>
              ))}
            </div>
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