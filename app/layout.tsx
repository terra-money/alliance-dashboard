import '@/styles/globals.css';
import Nav from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata = {
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
