import { auth } from "@clerk/nextjs/server";
import { cookies } from 'next/headers'
import Link from 'next/link'
import Referral from '@/models/Referral'
import { connectToDatabase } from '@/lib/mongoose'
import ReferralLink from '../components/ReferralLink' // <-- Import normally, not dynamic


export default async function ProfilePage() {
  const { userId } = await auth() || {};
  const cookieStore = await cookies();
  const ref = cookieStore.get('ref')?.value;
  <Link href="/profile/history" className="text-blue-600 underline">
  View Your History
</Link>
  // ...referral logic...

  const referralLink = userId
  ? `https://homework-ai-v2.vercel.app/?ref=${userId}`
  : "";
<Link href="/profile/history">
  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-indigo-700 transition">
    🧠 View My History
  </button>
</Link>
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {userId && <ReferralLink referralLink={referralLink} />}

    </div>
  );
}