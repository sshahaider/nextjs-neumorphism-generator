import localFont from "next/font/local";
import "./globals.css";
import { siteLink, siteName } from "@/config";
import clsx from "clsx";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});



const meta = {
  title: 'NextJs Neumorphism Generator',
  dec: "Improve your web design with our Neumorphism CSS Generator. easily create sleek, modern UIs with this powerful tool. Boost your site's user experience now.",
  link: siteLink + "/"
}


export const metadata = {
  title: meta.title,
  description: meta.dec,
  metadataBase: new URL(siteLink),
  applicationName: siteName,
  keywords: ['Neumorphism', 'Neumorphism CSS Generator', 'Neumorphism Generator', 'Soft UI Generator', 'Neumorphism Tailwind Generator', 'Soft Shadows Generator'],
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  alternates: {
    canonical: meta.link,
  },
  openGraph: {
    title: meta.title,
    description: meta.dec,
    url: meta.link,
    locale: 'en-US',
    siteName,
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          "min-h-screen bg-transperent antialiased",
          geistSans.className
        )}
      >
        <div className="relative flex flex-col">
          <Header />
          <main className="w-full min-h-screen mx-auto py-16 px-2 md:px-5 lg:px-10 flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
