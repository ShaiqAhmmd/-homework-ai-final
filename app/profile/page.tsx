import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import Link from "next/link"; // ✅ MAKE SURE THIS IS IMPORTED
import Referral from "@/models/Referral";
import { connectToDatabase } from "@/lib/mongoose";
import ReferralLink from "../components/ReferralLink";

export default async function ProfilePage() {
  // 🧠 Clerk Auth
  const { userId } = await auth() || {};

  // 🍪 Referral logic (on first login)
  const cookieStore = await cookies();
  const ref = cookieStore.get("ref")?.value;

  if (userId && ref && userId !== ref) {
    await connectToDatabase();
    const alreadyReferred = await Referral.findOne({
      referrer: ref,
      newUser: userId,
    });

    if (!alreadyReferred) {
      await Referral.create({ referrer: ref, newUser: userId });
    }

    // Optionally clear the cookie
    cookieStore.set("ref", "", { maxAge: 0 });
  }

  // Generate referral link
  const referralLink = userId
    ? `https://homework-ai-v2.vercel.app/?ref=${userId}`
    : "";

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {/* 📥 Referral Block */}
      {userId && (
        <ReferralLink referralLink={referralLink} />
      )}

      {/* 📜 History Button */}
      <div className="mt-8">
        <Link href="/profile/history">
          <button
            className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition text-center text-base"
          >
            📜 View My History
          </button>
        </Link>
      </div>
    </div>
  );
}