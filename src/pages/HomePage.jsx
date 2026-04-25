import HeroSlider from '../components/home/HeroSlider'
import FeatureList from '../components/home/FeatureList'
import BlogPreview from '../components/home/BlogPreview'
import AdvisorSection from '../components/home/AdvisorSection'
import TestimonialSection from '../components/home/TestimonialSection'
import BackgroundLines from '../components/ui/BackgroundLines'

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <BackgroundLines />
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#3bab35]/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-[32rem] h-80 w-80 rounded-full bg-[#0f4f24]/8 blur-3xl" />
        <div className="absolute left-[30%] top-[60rem] h-56 w-56 rounded-full bg-[#266623]/6 blur-3xl" />
      </div>

      <div className="section-stack">
        <HeroSlider />
        <FeatureList />
        <AdvisorSection />
        <BlogPreview />
        <TestimonialSection />
      </div>
    </div>
  )
}

export default HomePage
