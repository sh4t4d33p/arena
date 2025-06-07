/**
 * Arena Social Layout
 * 
 * Root layout component for the Arena Social application.
 * Sets up the base HTML structure and global providers.
 * Configures fonts and metadata for the application.
 * 
 * @file layout.tsx
 */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

/**
 * Inter Font Configuration
 * 
 * Configures the Inter font for the application with latin subset.
 * Uses CSS variable for font family.
 * 
 * @type {Font}
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

import './globals.css';
import { Providers } from './providers';

/**
 * Application Metadata
 * 
 * Defines the metadata for the application including title and description.
 * Used by Next.js for SEO and page information.
 * 
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: 'Arena Social',
  description: 'Decentralized social media platform built on Ethereum',
};

/**
 * Root Layout Component
 * 
 * @component RootLayout
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Root layout component
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
