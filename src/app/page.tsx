import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import { db } from "@/lib/prisma";

export default async function Home() {
  try {
    const products = await db.product.findMany({
      take: 3, // Only get first 4 products for the home page
      orderBy: {
        order: 'asc'
      }
    });
    console.log(`✅ Successfully connected to database. Found ${products.length} products.`);

    return (
      <main className="p-8">
        <Hero />
        <BestSellers bestSellerData={products}/>
      </main>
    );
  } catch (error) {
    console.error('❌ Database connection error:', error);

    return (
      <main className="p-8">
        <Hero />
        <BestSellers bestSellerData={[]}/>
      </main>
    );
  }
}
