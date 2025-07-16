import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDatabase();
    const { userId } = await auth();

    if (!userId) return NextResponse.json({ isPro: false });

    const user = await User.findOne({ clerkId: userId });
    return NextResponse.json({ isPro: user?.isPro || false });
  } catch (err) {
    console.error('[GET_USER_INFO_ERROR]', err);
    return NextResponse.json({ isPro: false }, { status: 500 });
  }
}