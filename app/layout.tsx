import { Metadata } from 'next'
import '@/styles/globals.css';
import Nav from '@/components/Nav';
import { Footer } from '@/components/Footer';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Alliance Analytics Dashboard',
  description: 'by Big labs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Alliance Analytics Dashboard</title>
      </Head>
      <body>
        <main className='app'>
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
