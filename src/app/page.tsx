import Header from "@/components/layout/header";
import Hero from "@/components/layout/hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen">
        <Hero />
      </main>
    </>

  );
}
