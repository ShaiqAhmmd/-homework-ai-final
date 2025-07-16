import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();
    return NextResponse.json({ userId: userId ?? null });
  } catch (err) {
    console.error('❌ /api/user/id error:', err);
    return NextResponse.json({ userId: null }, { status: 500 });
  }
}