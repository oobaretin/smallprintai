import { FeaturesGrid } from "@/components/FeaturesGrid";
import { Footer } from "@/components/Footer";
import { HeroHeader } from "@/components/HeroHeader";
import { HomeUploadSection } from "@/components/home-upload-section";
import { Navbar } from "@/components/navbar";
import { PrivacyBanner } from "@/components/privacy-banner";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] pt-20">
      <Navbar />

      <HeroHeader />

      <FeaturesGrid />

      <section
        id="upload"
        className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24"
        aria-labelledby="upload-heading"
      >
        <h2 id="upload-heading" className="sr-only">
          Upload your document
        </h2>
        <HomeUploadSection />
        <div className="mt-4 flex justify-center">
          <PrivacyBanner />
        </div>
      </section>

      <Footer />
    </div>
  );
}
