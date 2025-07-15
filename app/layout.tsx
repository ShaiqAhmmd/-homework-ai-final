import { ClerkProvider, useUser } from '@clerk/nextjs';
import FooterSection from './components/FooterSection';
import HeaderSection from './components/HeaderSection';
import AuthButtons from './components/AuthButtons';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Homework AI',
  description: 'Your Intelligent Study Assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const trackReferral = async () => {
      if (!user || !isSignedIn) return;

      try {
        await fetch('/api/user/track-referral', {
          method: 'POST',
          body: JSON.stringify({
            clerkId: user.id,
            email: user?.primaryEmailAddress?.emailAddress,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (err) {
        console.error('Failed to track referral:', err);
      }
    };

    trackReferral();
  }, [user, isSignedIn]);

  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
          style={{
            background: 'var(--bg)',
            color: 'var(--text)',
            minHeight: '100vh',
          }}
        >
          <main className="max-w-7xl mx-auto px-4 py-10 mt-20">{children}</main>
          <FooterSection />
          <HeaderSection />
        </body>
      </html>
    </ClerkProvider>
  );
}