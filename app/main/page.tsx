import MainSection from '../components/MainSection'
import SubjectsSection from '../components/SubjectsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import SocialShareButtons from '../components/SocialShareButtons'
import HowItWorksSection from '../components/HowItWorksSection'
import ChatPreviewSection from '../components/ChatPreviewSection'
import WhyChooseSection from '../components/WhyChooseSection'
import StudyPackGenerator from '../components/StudyPackGenerator';

export default function Home() {
  return (
    <>
      <MainSection />
      <StudyPackGenerator />
       <HowItWorksSection />
       <ChatPreviewSection />
      <SubjectsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <SocialShareButtons />
    </>
  )
}