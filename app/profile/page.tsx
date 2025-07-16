'use client';

import { useEffect, useState } from 'react';
import ReferralLink from '../components/ReferralLink';

export default function ProfilePage() {
  const [referralCount, setReferralCount] = useState<number>(0);
  const [referralLink, setReferralLink] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch('/api/user/referral-count'),
          fetch('/api/user/id')
        ]);

        const countData = await res1.json();
        const userData = await res2.json();

        setReferralCount(countData.count || 0);

        if (userData.userId) {
          setReferralLink(`https://homework-ai-v2.vercel.app/?ref=${userData.userId}`);
        }
      } catch (err) {
        console.error('Failed to load referral data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileInfo();
  }, []);

  if (loading) return <div className="p-4">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {referralLink && <ReferralLink referralLink={referralLink} />}

      <div className="mt-6 p-4 bg-yellow-100 border border-yellow-300 rounded text-yellow-900 font-semibold">
        🎁 You've referred {referralCount} {referralCount === 1 ? 'friend' : 'friends'}.
        {referralCount < 5 ? (
          <> Invite {5 - referralCount} more to unlock <span className="text-purple-700 font-bold">Pro</span> features!</>
        ) : (
          <> You've unlocked <span className="text-green-700 font-bold">Pro</span> features! 🎉</>
        )}
      </div>
    </div>
  );
}