import { Routes, Route } from "react-router-dom";
import MarketingLayout from "@/components/layout/marketing-layout";
import Home from "@/pages/Home";
import Contact from "@/pages/Contact";
import Estimator from "@/pages/Estimator";
import Portfolio from "@/pages/Portfolio";
import Blog from "@/pages/Blog";
import Team from "@/pages/Team";
import Testimonials from "@/pages/Testimonials";
import Careers from "@/pages/Careers";
import Residential from "@/pages/services/Residential";
import Commercial from "@/pages/services/Commercial";
import Industrial from "@/pages/services/Industrial";
import Infrastructure from "@/pages/services/Infrastructure";
import Renovation from "@/pages/services/Renovation";

export default function App() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/estimator" element={<Estimator />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/team" element={<Team />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/services/residential" element={<Residential />} />
        <Route path="/services/commercial" element={<Commercial />} />
        <Route path="/services/industrial" element={<Industrial />} />
        <Route path="/services/infrastructure" element={<Infrastructure />} />
        <Route path="/services/renovation" element={<Renovation />} />
      </Route>
    </Routes>
  );
}
