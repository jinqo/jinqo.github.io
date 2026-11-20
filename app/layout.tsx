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

const siteUrl = process.env.GITHUB_PAGES === 'true'
  ? 'https://jinqo.github.io'
  : 'https://jinqo-portfolio.liampattiata.chatgpt.site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'jinqo — Developer & Security Portfolio',
  description:
    'jinqo builds useful software with Python, Node.js, and Java, and does authorized ethical hacking — in scope, under NDA, disclosed responsibly. Projects synced live from GitHub.',
  openGraph: {
    title: 'jinqo — Developer & Security Portfolio',
    description: 'Development + authorized ethical hacking. Built in public, tested responsibly.',
    url: siteUrl,
    siteName: 'jinqo',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'JINQO — Development & Security Portfolio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jinqo — Developer & Security Portfolio',
    description: 'Development + authorized ethical hacking. Built in public, tested responsibly.',
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
