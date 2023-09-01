import { CallToAction } from "@/components/CallToAction";
import { Faqs } from "@/components/Faqs";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Pricing } from "@/components/Pricing";
import { PrimaryFeatures } from "@/components/PrimaryFeatures";
import { Reviews } from "@/components/Reviews";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      {/* <PrimaryFeatures /> */}
      {/* <SecondaryFeatures /> */}
      <CallToAction />
      <Reviews />
      {/* <Pricing />
      <Faqs /> */}
      <Footer />
    </>
  );
}
