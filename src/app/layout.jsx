import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import { LanguageProvider } from "./LanguageProvider";
import ThemeProvider from "./themeprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider initialLang="EN">
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-grow mx-auto px-4 py-8">
                {children}
              </div>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
