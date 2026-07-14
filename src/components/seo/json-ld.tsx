import { LINKS, SITE } from "@/lib/constants";

const description =
  "Hanix (HNX) is an ERC-20 cryptocurrency built on the Base blockchain as a Web3 learning and development project.";

export function JsonLd() {
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      name: SITE.name,
      url: SITE.url,
      description,
      inLanguage: "en",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      description,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/coin.png`,
        width: 512,
        height: 512,
      },
      sameAs: [LINKS.twitter, LINKS.github, LINKS.discord].filter(Boolean),
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/#app`,
      name: `${SITE.name} (${SITE.ticker})`,
      applicationCategory: "FinanceApplication",
      applicationSubCategory: "Cryptocurrency",
      operatingSystem: "Web",
      description,
      url: SITE.url,
      image: `${SITE.url}/coin.png`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
