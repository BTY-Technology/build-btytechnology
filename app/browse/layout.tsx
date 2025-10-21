import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Professional Website Templates",
  description:
    "Explore our collection of professional, modern website templates for professional services, e-commerce, and more. Built by BTY Technology.",
  openGraph: {
    title: "Browse Professional Website Templates | BTY Technology",
    description:
      "Explore our collection of professional, modern website templates. Built Better Than Yesterday.",
    type: "website",
    url: "https://build.btytechnology.com/browse",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BTY Technology Website Templates Gallery",
      },
    ],
  },
};

export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
