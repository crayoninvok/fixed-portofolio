import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';
import Footer from '@/components/layout/Footer';

// Dynamically import Navbar with no SSR
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { 
  ssr: false 
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Personal portfolio showcasing my work and experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}