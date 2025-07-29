import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";


export default function Home() {
  return (
    <main className="p-8">
      <Hero />
      <BestSellers />
    </main>
  );
}
