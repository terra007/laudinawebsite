import type { Metadata } from "next";

import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Hypnosis } from "@/components/hypnosis";
import { Navbar } from "@/components/navbar";
import { PricingCards } from "@/components/pricing-cards";
import { Psychotherapy } from "@/components/psychotherapy";
import { ServicesGrid } from "@/components/services-grid";
import { media } from "@/lib/media";
import { seo, structuredData } from "@/lib/seo";
import { locations } from "@/lib/site";

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
        <Hero
          video={media("heroVideo")}
          poster={media("heroPoster")}
          locationImages={Object.fromEntries(locations.map((location) => [location.id, media(location.image)]))}
        />
        <Psychotherapy image={media("therapie")} />
        <Hypnosis image={media("hypnose")} />
        <ServicesGrid hasOrfVideo={Boolean(orfVideo)} />
        <About portrait={portrait} orfVideo={orfVideo} orfPoster={media("orfPoster")} />
        <PricingCards />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(portrait)).replace(/</g, "\\u003c") }} />
    </>
  );
}
