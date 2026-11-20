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
  title: 'jinqo — Security Engineering & Software Portfolio',
  description:
    'Aspiring security engineer: server-side anticheat development, self-hosted Linux infrastructure, AI tooling, and authorized security research under a formal school agreement.',
  openGraph: {
    title: 'jinqo — Security Engineering & Software Portfolio',
    description: 'Security engineering, Linux infrastructure, and software projects — with real, labelled status.',
    url: siteUrl,
    siteName: 'jinqo',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'JINQO — Security Engineering & Software Portfolio' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'jinqo — Security Engineering & Software Portfolio',
    description: 'Security engineering, Linux infrastructure, and software projects — with real, labelled status.',
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
