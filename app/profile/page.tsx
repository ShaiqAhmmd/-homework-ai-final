'use client';

import { useEffect, useState } from 'react';
import ReferralLink from '../components/ReferralLink';
import Link from 'next/link';

export default function ProfilePage() {
  const [referralCount, setReferralCount] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch('/api/user/referral-count'),
          fetch('/api/user/id'),
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        setReferralCount(data1.count ?? 0);

        if (data2.userId) {
          setReferralLink(`https://homework-ai-final.vercel.app/?ref=${data2.userId}`);
        }
      } catch (err) {
        console.error('Failed to load referral data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔄 Show loading state
  if (loading) return <div className="p-6 text-center">Loading your profile...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* ✅ Referral Link Component */}
      {referralLink && (
        <div className="mb-4">
          <ReferralLink referralLink={referralLink} />
        </div>
      )}

      {/* ✅ Referral Count Banner */}
      {referralCount !== null && (
        <div className="my-6 p-4 bg-yellow-100 border border-yellow-300 rounded text-yellow-900 font-semibold">
          🎁 You've referred {referralCount} {referralCount === 1 ? 'friend' : 'friends'}.
          {referralCount < 5 ? (
            <> Invite {5 - referralCount} more to unlock <span className="text-purple-700 font-bold">Pro</span> features!</>
          ) : (
            <> You've unlocked <span className="text-green-700 font-bold">Pro</span> features! 🎉</>
          )}
        </div>
      )}

      {/* ✅ View History Button */}
      <div className="mt-8">
        <Link href="/profile/history">
          <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
            📜 View My History
          </button>
        </Link>
      </div>
    </div>
  );
}