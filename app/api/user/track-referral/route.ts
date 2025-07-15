import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/mongoose';
import Referral from '@/models/Referral';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { clerkId, email } = await req.json();

    let user = await User.findOne({ clerkId });

    // Skip if already saved or not signed in
    if (user?.referredBy || !clerkId || !email) {
      return NextResponse.json({ success: false, message: 'Already tracked or invalid.' });
    }

    // Create user if doesn't exist
    if (!user) {
      user = await User.create({ clerkId, email });
    }

    const cookieStore = await cookies();
    const referralId = cookieStore.get('referral')?.value;

    if (referralId && referralId !== clerkId) {
      user.referredBy = referralId;
      await user.save();

      await Referral.create({
        referredUser: user._id,
        referringUser: referralId,
        createdAt: new Date(),
      });

      // Count referrals
      const count = await Referral.countDocuments({ referringUser: referralId });

      if (count >= 5) {
        // Upgrade referrer to Pro
        const referrer = await User.findById(referralId);
        if (referrer) {
          referrer.isPro = true;
          await referrer.save();
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Referral Error]', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}