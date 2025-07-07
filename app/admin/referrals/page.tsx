import { connectToDatabase } from '@/lib/mongoose'
import Referral from '@/models/Referral'

export default async function ReferralsPage() {
  await connectToDatabase();
  const referrals = await Referral.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Referrals</h1>
      <ul className="space-y-4">
        {referrals.map((ref: any) => (
          <li key={ref._id} className="bg-white rounded shadow p-4">
            <div><b>Referrer:</b> {ref.referrer}</div>
            <div><b>New User:</b> {ref.newUser}</div>
            <div className="text-gray-500 text-xs">{new Date(ref.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}