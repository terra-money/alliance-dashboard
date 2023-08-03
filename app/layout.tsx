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
      <head>
        <meta property="og:image" content='http://alliance-dashboard.vercel.app/assets/images/banner.png'  />
        <meta property="og:image:secure_url" content='https://alliance-dashboard.vercel.app/assets/images/banner.png'  />
      </head>
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
