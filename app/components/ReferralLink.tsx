'use client'
import React from "react";

export default function ReferralLink({ referralLink }: { referralLink: string }) {
  return (
    <div className="mt-8 bg-blue-50 rounded p-4">
      <div className="font-semibold mb-2">Invite a friend, get Pro free for a week!</div>
      <div className="flex gap-2 items-center">
        <input
          className="border border-gray-300 rounded px-2 py-1 flex-1"
          value={referralLink}
          readOnly
          onClick={e => (e.target as HTMLInputElement).select()}
        />
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => {
            navigator.clipboard.writeText(referralLink);
            alert("Referral link copied!");
          }}
        >
          Copy
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Share this link with friends. When they sign up, you’ll get Pro free for a week!
      </div>
    </div>
  );
}