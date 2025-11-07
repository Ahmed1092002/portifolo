import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import LocalizationLoader from "./components/LocalizationLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Tamer — a Software Engineer & Flutter & Web Developer",
  keywords: [
    "Ahmed Tamer",
    "Software Engineer",
    "Flutter Developer",
    "Web Developer",
  ],
  icons: {
    icon: "/Gemini_Generated_Image_pc7nb0pc7nb0pc7n.ico",
  },
  description:
    "a Software Engineer experienced in Flutter and React ecosystems, with a solid background in building mobile and web applications. I've worked on ERP systems, AI chat applications, invoicing systems, and payment solutions at AppLogica.",
  openGraph: {
    title: "Ahmed Tamer — a Software Engineer & Flutter & Web Developer",
    description:
      "a Software Engineer experienced in Flutter and React ecosystems, with a solid background in building mobile and web applications.",
    images: [
      {
        url: "/Photoroom-20240702_185228_transparent.png",
        width: 1200,
        height: 630,
        alt: "Ahmed Tamer - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Tamer — a Software Engineer & Flutter & Web Developer",
    description:
      "a Software Engineer experienced in Flutter and React ecosystems, with a solid background in building mobile and web applications.",
    images: ["/Photoroom-20240702_185228_transparent.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <LocalizationLoader>
              <ScrollProgress />
              <CustomCursor />
              {children}
            </LocalizationLoader>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
