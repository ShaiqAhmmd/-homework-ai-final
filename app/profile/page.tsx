import { auth } from '@clerk/nextjs/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Referral from '@/models/Referral'
import User from '@/models/User'
import { connectToDatabase } from '@/lib/mongoose'
import ReferralLink from '../components/ReferralLink'
import { sendProUpgradeEmail } from '@/lib/sendEmail'

export default async function ProfilePage() {
  const { userId } = await auth() || {}

  const cookieStore = await cookies()
  const ref = cookieStore.get('ref')?.value

  if (userId && ref && userId !== ref) {
    await connectToDatabase()
    console.log('Referral logic running', { userId, ref })

    try {
      // Check if referral already exists to avoid duplicates
      const alreadyReferred = await Referral.findOne({
        referrer: ref,
        newUser: userId,
      })
      console.log('Already referred:', alreadyReferred)

      if (!alreadyReferred) {
        await Referral.create({ referrer: ref, newUser: userId })
        console.log('Referral created:', { referrer: ref, newUser: userId })

        // Update referral count and upgrade to Pro if needed
        const user = await User.findOne({ userId: ref })
        if (user) {
          user.referralCount = (user.referralCount || 0) + 1
          console.log('Referral count updated:', user.referralCount)
          if (user.referralCount >= 3 && !user.isPro) {
            user.isPro = true
            await user.save()
            console.log('User upgraded to Pro:', user.userId)
            try {
              await sendProUpgradeEmail(user.email, user.name || 'Student')
              console.log('Pro upgrade email sent')
            } catch (err) {
              console.error('Failed to send Pro upgrade email:', err)
            }
          } else {
            await user.save()
            console.log('User saved:', user.userId)
          }
        } else {
          console.log('Referrer user not found:', ref)
        }
      }
    } catch (err) {
      console.error('Referral logic error:', err)
    }

    // Clear referral cookie
    cookieStore.set('ref', '', { maxAge: 0 })
  }

  // Generate referral link
  const referralLink = userId
    ? `https://homework-ai-v2.vercel.app/?ref=${userId}`
    : ''

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      {userId && <ReferralLink referralLink={referralLink} />}

      <div className="mt-8">
        <Link href="/profile/history">
          <button className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
            📜 View My History
          </button>
        </Link>
      </div>
    </div>
  )
}