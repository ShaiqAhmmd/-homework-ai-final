import { auth } from "@clerk/nextjs/server";
import { cookies } from 'next/headers'
import Referral from '@/models/Referral'
import { connectToDatabase } from '@/lib/mongoose'
import dynamic from "next/dynamic";

// Dynamically import the client component for the referral link
const ReferralLink = dynamic(() => import('../components/ReferralLink'), { ssr: false });

export default async function ProfilePage() {
  const { userId } = await auth() || {};
  const cookieStore = await cookies();
  const ref = cookieStore.get('ref')?.value;

  // Only save referral if this is a new user and ref exists
  if (userId && ref && userId !== ref) {
    await connectToDatabase();
    // Check if this referral already exists to avoid duplicates
    const exists = await Referral.findOne({ referrer: ref, newUser: userId });
    if (!exists) {
      await Referral.create({ referrer: ref, newUser: userId });
    }
    // Optionally, clear the cookie after saving
    cookieStore.set('ref', '', { maxAge: 0 });
  }

  const referralLink = userId
    ? `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}?ref=${userId}`
    : "";

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {/* Add your history, etc. here */}
      {userId && <ReferralLink referralLink={referralLink} />}
    </div>
  );
}