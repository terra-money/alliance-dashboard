import { Metadata } from 'next'
import '@/styles/globals.css';
import Nav from '../components/Nav';
import { Suspense } from 'react';
import CSSLoader from '../components/CSSLoader';

export const metadata: Metadata = {
  title: 'Alliance Analytics Dashboard',
  description: 'The official analytics dashboard for tracking Alliance assets and yields.',
  openGraph: {
    title: 'Alliance Analytics Dashboard',
    description: 'The official analytics dashboard for tracking Alliance assets and yields.',
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
    description: 'The official analytics dashboard for tracking Alliance assets and yields.',
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
        </main>
      </body>
    </html>
  )
}
