import BouquetBuilder from "@/components/BouquetBuilder";
import Community from "@/components/Community";
import FeatureBadges from "@/components/FeatureBadges";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureBadges />
        <FeaturedProducts />
        <BouquetBuilder />
        <Community />
      </main>
      <Footer />
    </>
  );
}
