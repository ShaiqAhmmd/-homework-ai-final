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
    const [res1, res2] = await Promise.all([
  fetch('/api/user/referral-count'),
  fetch('/api/user/id'),
]);

const countData = res1.ok ? await res1.json() : { count: 0 };
const idData = res2.ok ? await res2.json() : { userId: null };

        if (idData.userId) {
          setReferralLink(`https://homework-ai-final.vercel.app/?ref=${idData.userId}`);
        }

        setReferralCount(countData.count ?? 0);
        setLoading(false);
      } catch (err) {
        console.error('Profile load error:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* 🔗 Referral Link */}
      {referralLink && (
        <div className="bg-white p-4 rounded border text-center shadow mb-6">
          <p className="text-gray-700 font-semibold mb-2">Your Referral Link</p>
          <div className="bg-gray-100 text-sm rounded px-4 py-2 break-all font-mono border">
            {referralLink}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(referralLink)}
            className="mt-2 text-sm text-blue-600 underline"
          >
            📋 Copy Link
          </button>
        </div>
      )}

      {/* 🎁 Referral Count */}
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

      {/* 📜 View History Button */}
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