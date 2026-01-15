import Navbar from "./components/Navbar"
import HeroSlider from "./components/HeroSlider"
import FeatureGrid from "./components/FeatureGrid"
import CourseSection from "./components/CourseSection"
import VoucherBanner from "./components/VoucherBanner"
import PricingSection from "./components/PricingSection"
import Footer from "./components/Footer"

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <FeatureGrid />
      <CourseSection />
      <VoucherBanner />
      <PricingSection />
      <Footer />
    </>
  )
}
