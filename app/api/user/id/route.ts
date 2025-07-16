import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ userId: null });
    }

    return NextResponse.json({ userId });
  } catch (err) {
    console.error('❌ /api/user/id error:', err);
    return NextResponse.json({ userId: null }, { status: 500 });
  }
}