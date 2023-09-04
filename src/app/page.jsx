import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { Reviews } from "@/components/Reviews";


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <PrimaryFeatures />
      <CallToAction />
      <Reviews />
      <Footer />
    </>
  );
}
