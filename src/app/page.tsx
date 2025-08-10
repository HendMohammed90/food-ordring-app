import { getBestSellers } from "@/server/db/products";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";


export default async function Home() {
  try {
    const bestSellers = await getBestSellers();

    return (
      <main className="p-8">
        <Hero />
        <BestSellers bestSellerData={bestSellers} />
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
