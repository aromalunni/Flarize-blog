import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProgressBar, WhatsAppFloat, StickyBar, ScrollAnimations } from '@/components/layout/ClientWidgets';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Flarize Blog — Kerala Solar Energy Guides',
    template: '%s | Flarize',
  },
  description: "India's first solar booking platform. Expert guides on solar panel subsidies, pricing, and installation in Kerala.",
  metadataBase: new URL('https://flarize.com'),
  openGraph: { type: 'website', locale: 'en_IN', siteName: 'Flarize' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable} ${jetbrains.variable}`}>
      <body>
        <ProgressBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <StickyBar />
        <ScrollAnimations />
      </body>
    </html>
  );
}
