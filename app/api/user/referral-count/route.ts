import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongoose';
import Referral from '@/models/Referral';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { userId } = await auth(); // ✅ Fix: use "await"

    if (!userId) {
      return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }

    const count = await Referral.countDocuments({ referringUser: userId });

    return NextResponse.json({ count });
  } catch (err) {
    console.error('[Referral Count Error]', err);
    return NextResponse.json({ error: 'Failed to get referral count' }, { status: 500 });
  }
}