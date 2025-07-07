import { auth } from "@clerk/nextjs/server";
import { cookies } from 'next/headers'
import Referral from '@/models/Referral'
import { connectToDatabase } from '@/lib/mongoose'

export default async function ProfilePage() {
  const { userId } = await auth() || {};
  const cookieStore = await cookies(); // <-- await here!
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
      {/* ...your history, etc... */}
      {userId && (
        <div className="mt-8 bg-blue-50 rounded p-4">
          <div className="font-semibold mb-2">Invite a friend, get Pro free for a week!</div>
          <div className="flex gap-2 items-center">
            <input
              className="border border-gray-300 rounded px-2 py-1 flex-1"
              value={referralLink}
              readOnly
              onClick={e => (e.target as HTMLInputElement).select()}
            />
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => {
                navigator.clipboard.writeText(referralLink);
                alert("Referral link copied!");
              }}
            >
              Copy
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Share this link with friends. When they sign up, you’ll get Pro free for a week!
          </div>
        </div>
      )}
    </div>
  );
}