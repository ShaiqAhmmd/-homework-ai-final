import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/lib/mongoose'; // ✅
import User from '@/models/User';
import Referral from '@/models/Referral';

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { clerkId, email } = await req.json();
    const cookieStore = await cookies();

    if (!clerkId || !email) {
      return NextResponse.json({ success: false, message: 'Missing clerkId or email' }, { status: 400 });
    }

    const referredBy = cookieStore.get('referral')?.value;

    if (!referredBy || referredBy === clerkId) {
      return NextResponse.json({ success: false, message: 'Missing or self-referral' });
    }

    // Find or create user
    let user = await User.findOne({ clerkId });
    if (!user) {
      user = await User.create({ clerkId, email });
    }

    // Already tracked?
    if (user.referredBy) {
      return NextResponse.json({ success: false, message: 'Already tracked' });
    }

    // Save who referred the user
    user.referredBy = referredBy;
    await user.save();

    // Create referral record
    await Referral.create({
      referredUser: user._id,
      referringUser: referredBy,
      createdAt: new Date(),
    });

    // Count total referrals
    const referralCount = await Referral.countDocuments({ referringUser: referredBy });

    if (referralCount >= 5) {
      const referrer = await User.findOne({ clerkId: referredBy });

      if (referrer && !referrer.isPro) {
        referrer.isPro = true;
        await referrer.save();
        console.log(`🎉 ${referrer.email} upgraded to Pro via referrals`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('🔴 Referral tracking error:', err);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}