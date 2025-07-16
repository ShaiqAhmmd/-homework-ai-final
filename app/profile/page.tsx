'use client';

import { useEffect, useState } from 'react';
import ReferralLink from '../components/ReferralLink';
import Link from 'next/link';

export default function ProfilePage() {
  const [referralCount, setReferralCount] = useState<number | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countRes, idRes] = await Promise.all([
          fetch('/api/user/referral-count'),
          fetch('/api/user/id'),
        ]);

        const { count } = await countRes.json();
        const { userId } = await idRes.json();

        setReferralCount(count ?? 0);

        if (userId) {
          setReferralLink(`https://homework-ai-final.vercel.app/?ref=${userId}`);
        }
      } catch (err) {
        console.error('Failed to fetch referral data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* ✅ Referral Link */}
      {referralLink && (
        <div className="bg-white p-4 rounded border text-center shadow mb-6">
          <p className="text-gray-700 font-semibold mb-2">Your Referral Link</p>
          <div className="bg-gray-100 text-sm rounded px-4 py-2 break-all font-mono border">
            {referralLink}
          </div>
        </div>
      )}

      {/* ✅ Referral Count */}
      {referralCount !== null && (
        <div className="my-6 p-4 bg-yellow-100 border border-yellow-300 rounded text-yellow-900 font-semibold">
          🎁 You've referred {referralCount} {referralCount === 1 ? 'friend' : 'friends'}.
          {referralCount < 5 ? (
            <> Invite {5 - referralCount} more to unlock <span className="text-purple-600 font-bold">Pro</span> features!</>
          ) : (
            <> 🎉 You’ve unlocked <span className="text-green-700 font-bold">Pro</span> status!</>
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