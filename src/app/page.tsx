import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import { db } from "@/lib/prisma";

export default async function Home() {
  try {

    const data = await db.size.findMany({});
    // console.log(`✅ Successfully connected to database. Found ${data} sizes.`);

    const products = await db.product.findMany({
      take: 3, // Only get first 4 products for the home page
      orderBy: {
        order: 'asc'
      },
      include: {
        sizes: true,
        extras: true,
      },
    });
    // console.log(`✅ Successfully connected to database. Found ${products.length} products.`);

    return (
      <main className="p-8">
        <Hero />
        <BestSellers bestSellerData={products} />
      </main>
    );
  } catch (error) {
    console.error('❌ Database connection error:', error);

    return (
      <main className="p-8">
        <Hero />
        <BestSellers bestSellerData={[]} />
      </main>
    );
  }
}
