import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongoose'; // ✅
import History from '@/models/History';

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
    }

    const history = await History.find({ userId }).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ history });
  } catch (err) {
    console.error('🔴 /api/history error:', err);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}