import type { Metadata } from "next";

import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Hypnosis } from "@/components/hypnosis";
import { MobileContact } from "@/components/mobile-contact";
import { Navbar } from "@/components/navbar";
import { PricingCards } from "@/components/pricing-cards";
import { Psychotherapy } from "@/components/psychotherapy";
import { ServicesGrid } from "@/components/services-grid";
import { media } from "@/lib/media";
import { seo, structuredData } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  const orfVideo = media("orfVideo");
  const portrait = media("portrait");

  return (
    <>
      <Navbar />
      <main id="inhalt">
        <Hero portrait={portrait} />
        <Psychotherapy image={media("therapie")} />
        <Hypnosis image={media("hypnose")} />
        <ServicesGrid hasOrfVideo={Boolean(orfVideo)} />
        <About portrait={portrait} orfVideo={orfVideo} orfPoster={media("orfPoster")} />
        <PricingCards />
        <Contact />
      </main>
      <Footer />
      <MobileContact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(portrait)).replace(/</g, "\\u003c") }} />
    </>
  );
}
