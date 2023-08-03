import '@/styles/globals.css';
import Nav from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = {
  title: 'Alliance Analytics Dashboard',
  description: 'by Big labs',
  openGraph: {
    type: 'website',
    title: 'Alliance Analytics Dashboard',
    description: 'by Big labs',
    images: [
      {
        url: '/assets/images/banner.png',
        alt: 'Alliance Analytics Dashboard',
        width: 800,
        height: 600,
        type: 'image/png',
      },
    ],
    siteName: 'Alliance Analytics Dashboard',
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
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
