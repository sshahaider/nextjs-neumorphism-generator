import Script from "next/script"
import InfoCard from "@/components/InfoCard";
import NeumorphismGenerator from "@/components/neumorphism-generator";
import { siteLink, siteName } from "@/config";

export default function NeumorphismGeneratorPage() {

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "SoftwareApplication",
    "name": "Your Neumorphism CSS Generator",
    "description": "A free online tool for designers to generate Neumorphism CSS effortlessly.",
    "url": siteLink,
    "applicationCategory": "Design",
    "operatingSystem": "Web",
    "author": {
      "@type": "Organization",
      "name": "sshahaider"
    },
    "datePublished": "2024-01-08",
    "inLanguage": "en",
    "softwareVersion": "1.0",
    "keywords": "Neumorphism, CSS, Design, Web Development, Generator",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "http://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": siteName
      }
    }
  }



  return (
    <div className="min-h-screen mb-16">
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-center">Neumorphism CSS Generator</h1>

      <NeumorphismGenerator />

      <section className="px-2 my-10 md:px-4 h-full w-full text-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-4">
        <InfoCard
          icon={"fi-rs-infinity"}
          title={"Free & Unlimited"}
          des={"This Soft UI Generator is free! Use it as many times as you want to generate unlimited Neumorphic Elements."}
        />
        <InfoCard
          icon={"fi-br-time-fast"}
          title={"Fast"}
          des={"Get ready for some speedy CSS action! Our soft shadows are generated on the fly, making CSS retrieval a breeze."}
        />
        <InfoCard
          icon={"fi-rr-users-alt"}
          title={"User Friendly"}
          des={"The tool is designed to be user-friendly. So, Advanced knowledge is not required it's easy to use."}
        />

      </section>


      <h2>What is Neumorphism?</h2>
      <p>
        Neumorphism, also known as Soft UI, is a design trend that emerged as a response to the minimalism of flat design.
      </p>
      <h2>Neumorphism CSS Generator: A Game-Changer</h2>
      <p>
        Creating Neumorphic designs manually can be time-consuming, especially for designers who are not familiar with the intricate details of CSS. This is where Neumorphism CSS Generators come into play. These tools empower designers by automating the process, allowing them to generate CSS code with ease.</p>
      <h2>How to Use a Neumorphism CSS Generator</h2>
      <p>
        Using a Neumorphism CSS Generator is a straightforward process. This tool offers designers customization options to fine-tune Neumorphic elements. Once you are satisfied with the results, you can easily copy the generated CSS code and easily use it in your project.</p>

    </div>
  )

}