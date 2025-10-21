import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://build.btytechnology.com"),
  title: {
    default: "Professional Website Templates | BTY Technology",
    template: "%s | BTY Technology",
  },
  description:
    "Browse professional, modern website templates built by BTY Technology. Barbershop websites, restaurant websites, and more. Better Than Yesterday.",
  keywords: [
    "website templates",
    "professional websites",
    "modern web design",
    "barbershop website",
    "restaurant website",
    "BTY Technology",
    "Next.js templates",
  ],
  authors: [{ name: "BTY Technology" }],
  creator: "BTY Technology",
  publisher: "BTY Technology",
  icons: {
    icon: "/btyfavi.png",
    shortcut: "/btyfavi.png",
    apple: "/btyfavi.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://build.btytechnology.com",
    siteName: "BTY Technology Websites",
    title: "Professional Website Templates | BTY Technology",
    description:
      "Browse professional, modern website templates built by BTY Technology. Better Than Yesterday.",
    images: [
      {
        url: "/btyfavi.png",
        width: 1200,
        height: 630,
        alt: "BTY Technology Website Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Website Templates | BTY Technology",
    description:
      "Browse professional, modern website templates built by BTY Technology.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else if (theme === 'system') {
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  if (systemTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
