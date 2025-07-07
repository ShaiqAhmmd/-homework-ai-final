import { connectToDatabase } from '@/lib/mongoose'
import Referral from '@/models/Referral'

export default async function ReferralsPage() {
  await connectToDatabase();
  // Don't force the type here, just use as any[]
  const referrals = await Referral.find().sort({ createdAt: -1 }).lean() as any[];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Referrals</h1>
      <ul className="space-y-4">
        {referrals.map((ref: any, i: number) => (
          <li key={ref._id?.toString() || i} className="bg-white rounded shadow p-4">
            <div><b>Referrer:</b> {ref.referrer || "Unknown"}</div>
            <div><b>New User:</b> {ref.newUser || "Unknown"}</div>
            <div className="text-gray-500 text-xs">
              {ref.createdAt ? new Date(ref.createdAt).toLocaleString() : "Unknown date"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}