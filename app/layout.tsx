import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://storyofbari.vercel.app"),
  title: {
    default: "Story of Bari",
    template: "%s | Story of Bari",
  },
  description:
    "A personal blog about my journey as a software developer, sharing insights, experiences, and tips on coding, career growth, and the tech industry.",
  keywords: [
    "Portfolio",
    "Software Engineer",
    "Web Developer",
    "Fullstack Web",
    "Projects",
  ],
  authors: [{ name: "Ahmad Nasser Ambari" }],
  openGraph: {
    title: "Story of Bari",
    description:
      "A personal blog about my journey as a software developer, career growth, and the tech industry.",
    siteName: "Story of Bari",
    images: [
      {
        url: "/assets/logo_black.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Story of Bari",
    description:
      "A personal site about my journey as a software developer, career growth, and the tech industry.",
    images: ["/assets/logo_black.png"],
  },
  icons: {
    icon: "/assets/logo_black.ico",
    apple: "/assets/logo_black.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased text-white`}>
        <CustomCursor size={16} color="#ffffff" stiffness={500} />
        <Navbar />
        <div className="px-4 md:px-8 lg:px-12 w-full max-w-480 pt-24 mx-auto">
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
