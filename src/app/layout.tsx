import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata = {
  metadataBase: new URL('http://localhost:3001'),
  title: 'Karthik Ramadugu - Software Engineer',
  description: 'Computer Science graduate student at University of Dayton specializing in backend development. Passionate about building scalable solutions and innovative software.',
  keywords: 'Software Engineer, Full Stack Developer, Backend Development, University of Dayton, Computer Science, React, Node.js, Python',
  author: 'Karthik Ramadugu',
  openGraph: {
    title: 'Karthik Ramadugu - Software Engineer',
    description: 'Passionate software engineer specializing in backend development and innovative solutions.',
    url: 'https://karthik-portfolio.vercel.app',
    siteName: 'Karthik Ramadugu Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Karthik Ramadugu Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-black text-white font-inter antialiased">
        {children}
      </body>
    </html>
  )
}
