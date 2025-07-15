'use client';

import { auth } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Referral from '@/models/Referral';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongoose';
import { sendProUpgradeEmail } from '@/lib/sendEmail' // ✅ Correct
import ReferralLink from '../components/ReferralLink'; // make sure path is right
import { useEffect, useState } from 'react';

export default async function ProfilePage() {
  const { userId } = await auth();
  const cookieStore = await cookies();
  const ref = cookieStore.get('ref')?.value;

  // Run referral logic
  if (userId && ref && userId !== ref) {
    try {
      await connectToDatabase();
      const alreadyReferred = await Referral.findOne({ referrer: ref, newUser: userId });

      if (!alreadyReferred) {
        await Referral.create({ referrer: ref, newUser: userId });

        const user = await User.findOne({ userId: ref });
        if (user) {
          user.referralCount = (user.referralCount || 0) + 1;

          if (user.referralCount >= 5 && !user.isPro) {
            user.isPro = true;
            await sendProUpgradeEmail(user.email, user.name || 'Student');
          }

          await user.save();
        }
      }
    } catch (err) {
      console.error('Referral logic error:', err);
    }

    cookieStore.set('ref', '', { maxAge: 0 });
  }

  const referralLink = userId
    ? `https://homework-ai-v2.vercel.app/?ref=${userId}`
    : '';

  // ✅ Referral count state (client side)
  const [referralCount, setReferralCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch('/api/user/referral-count');
      const data = await res.json();
      setReferralCount(data.count ?? 0);
    };

    fetchCount();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* ✅ Referral Link */}
      {userId && <ReferralLink referralLink={referralLink} />}

      {/* ✅ Referral Count Notice */}
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

      {/* Button to view history */}
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