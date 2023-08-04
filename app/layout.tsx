import { Metadata } from 'next'
import '@/styles/globals.css';
import Nav from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';
import CSSLoader from '@/components/CSSLoader';

export const metadata: Metadata = {
  title: 'Alliance Analytics Dashboard',
  description: 'by Big labs',
  openGraph: {
    title: 'Alliance Analytics Dashboard',
    description: 'Dashboard for Alliance Analytics',
    siteName: 'Alliance Analytics Dashboard',
    url: "https://alliance-dashboard.terra.money/",
    images: [
      {
        url: 'http://alliance-dashboard.terra.money/opengraph-image.png',
        type: 'image/png',
        width: 800,
        height: 600,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alliance Analytics Dashboard',
    description: 'Dashboard for Alliance Analytics',
    images: {
      url: 'http://alliance-dashboard.terra.money/opengraph-image.png',
      alt: 'Alliance Analytics Dashboard Background Image',
    }
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className='app'>
          <Nav />
          <Suspense fallback={<CSSLoader />}>
            {children}
          </Suspense>
          <Footer />
        </main>
      </body>
    </html>
  )
}
