import { Metadata } from 'next'
import '@/styles/globals.css';
import Nav from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Alliance Analytics Dashboard',
  description: 'Testing again',
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
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
          <Footer />
        </main>
      </body>
    </html>
  )
}
