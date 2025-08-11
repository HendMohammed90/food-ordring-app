import { getBestSellers } from "@/server/db/products";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import { db } from "@/lib/prisma";
import About from "@/components/about";
import Contact from "@/components/contact";


export default async function Home() {

  try {
    const bestSellers = await getBestSellers();

    return (
      <main className="p-8">
        <Hero />
        <BestSellers bestSellerData={bestSellers} />
        <About />
        <Contact />
      </main>
    );
  } catch (error) {
    console.error('❌ Database connection error:', error);

    return (
      <main className="p-8">
        <Hero />
        <BestSellers bestSellerData={[]} />
        <About />
        <Contact />
      </main>
    );
  }
}
