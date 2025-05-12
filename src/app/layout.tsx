import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext';
import Header from '@/components/ui/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My App',
  description: 'A note-taking app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthContextProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">{children}</main>
            <footer className="bg-gray-800 text-white p-4 text-center">
              <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
            </footer>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
