import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import FeatureGrid from "./components/FeatureGrid";
import CourseSection from "./components/CourseSection";
import VoucherBanner from "./components/VoucherBanner";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import MasterTeacherSection from "./components/MasterSection";
import PaymentPage from "./components/PaymentPage";

function LandingPage() {
    return (
        <>
            <Navbar />
            <HeroSlider />
            <FeatureGrid />

            <section className="pb-0">
                <CourseSection />
            </section>

            <section className="relative bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 pt-10">
                <div className="-translate-y-1/2 absolute left-0 right-0 top-0 z-30">
                    <VoucherBanner />
                </div>
                <PricingSection />
            </section>

            <MasterTeacherSection />
            <Footer />
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter basename="/landing-edukasi-v2">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/payment" element={<PaymentPage />} />
            </Routes>
        </BrowserRouter>
    );
}
