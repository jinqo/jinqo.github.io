import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jinqo-portfolio.liampattiata.chatgpt.site'),
  title: 'jinqo — Developer Portfolio',
  description: 'jinqo builds useful software with Python, Node.js, and Java. Explore projects synced live from GitHub.',
  openGraph: {
    title: 'jinqo — Developer Portfolio',
    description: 'Python / Node.js / Java. Useful software, built in public.',
    url: 'https://jinqo-portfolio.liampattiata.chatgpt.site',
    siteName: 'jinqo',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'JINQO — Python, Node.js, Java' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jinqo — Developer Portfolio',
    description: 'Python / Node.js / Java. Useful software, built in public.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
