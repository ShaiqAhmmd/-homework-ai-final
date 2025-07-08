import { auth } from "@clerk/nextjs/server";
import { cookies } from 'next/headers'
import Referral from '@/models/Referral'
import { connectToDatabase } from '@/lib/mongoose'
import ReferralLink from '../components/ReferralLink' // <-- Import normally, not dynamic

export default async function ProfilePage() {
  const { userId } = await auth() || {};
  const cookieStore = await cookies();
  const ref = cookieStore.get('ref')?.value;

  // ...referral logic...

  const referralLink = userId
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}?ref=${userId}`
    : "";

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {userId && <ReferralLink referralLink={referralLink} />}
    </div>
  );
}