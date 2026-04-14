import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Analytics } from "@/components/analytics";
import { buildAbsoluteUrl, defaultMetadata, getDefaultSocialImage } from "@/lib/metadata";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/site-schema";

export const metadata: Metadata = {
  metadataBase: new URL(buildAbsoluteUrl("/")),
  title: defaultMetadata.title,
  description: defaultMetadata.description,
  applicationName: "CPVC Guide",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    type: "website",
    url: buildAbsoluteUrl("/"),
    siteName: "CPVC Guide",
    images: getDefaultSocialImage(),
  },
  twitter: {
    card: "summary_large_image",
    title: defaultMetadata.title,
    description: defaultMetadata.description,
    images: getDefaultSocialImage().map((image) => image.url),
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSchemas = [buildOrganizationSchema(), buildWebsiteSchema()];

  return (
    <html lang="en">
      <body>
        {siteSchemas.map((item, index) => (
          <JsonLd key={index} data={item} />
        ))}
        <div className="min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
