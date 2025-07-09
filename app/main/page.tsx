import MainSection from '../components/MainSection'
import SubjectsSection from '../components/SubjectsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import SocialShareButtons from '../components/SocialShareButtons'
import PricingSection from '../components/PricingSection'

export default function Home() {
  return (
    <>
      <MainSection />
      <SubjectsSection />
      <TestimonialsSection />
      <FAQSection />
   <PricingSection/>
      <ContactSection />
      <SocialShareButtons />
    </>
  )
}