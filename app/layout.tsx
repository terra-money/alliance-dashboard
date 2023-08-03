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
        <meta property="og:image" content='http://alliance-dashboard-git-adding-opg-metadata-joshuabrigati.vercel.app/assets/images/banner.png'  />
        <meta property="og:image:secure_url" content='https://alliance-dashboard-git-adding-opg-metadata-joshuabrigati.vercel.app/assets/images/banner.png'  />

        <meta property="og:url" content="https://alliance-dashboard-git-adding-opg-metadata-joshuabrigati.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Alliance Analytics Dashboard" />
        <meta property="og:description" content="Dashboard for Alliance" />
        <meta property="og:image" content="http://alliance-dashboard-git-adding-opg-metadata-joshuabrigati.vercel.app/assets/images/banner.png" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="alliance-dashboard-git-adding-opg-metadata-joshuabrigati.vercel.app" />
        <meta property="twitter:url" content="https://alliance-dashboard-git-adding-opg-metadata-joshuabrigati.vercel.app/" />
        <meta name="twitter:title" content="Alliance Analytics Dashboard" />
        <meta name="twitter:description" content="Dashboard for Alliance" />
        <meta name="twitter:image" content="http://alliance-dashboard-git-adding-opg-metadata-joshuabrigati.vercel.app/assets/images/banner.png" />
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
