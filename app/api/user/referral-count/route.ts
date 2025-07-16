import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongoose';
import Referral from '@/models/Referral';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ count: 0 }, { status: 401 });
    }

    const count = await Referral.countDocuments({ referringUser: userId });
    return NextResponse.json({ count });
  } catch (err) {
    console.error('❌ /api/user/referral-count error:', err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}