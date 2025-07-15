'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function ReferralTracker() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const track = async () => {
      if (!isSignedIn || !user) return;

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

    track();
  }, [user, isSignedIn]);

  return null;
}