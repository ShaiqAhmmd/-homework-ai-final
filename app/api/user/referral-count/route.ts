import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongoose';
import Referral from '@/models/Referral';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const { userId } = await auth();

  const count = userId
    ? await Referral.countDocuments({ referringUser: userId })
    : 0;

  return NextResponse.json({ count });
}