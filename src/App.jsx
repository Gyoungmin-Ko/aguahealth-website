import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import AIServices from './pages/AIServices'
import AIModule from './pages/ai/AIModule'
import Insights from './pages/Insights'
import CaseStudies from './pages/CaseStudies'
import MarketEntry from './pages/services/MarketEntry'
import Economics from './pages/services/Economics'
import Regulatory from './pages/services/Regulatory'
import Claims from './pages/services/Claims'
import ServiceAI from './pages/services/AIServices'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ai-solutions" element={<AIServices />} />
        <Route path="/ai-solutions/:moduleId" element={<AIModule />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/services/market-entry" element={<MarketEntry />} />
        <Route path="/services/economics" element={<Economics />} />
        <Route path="/services/regulatory" element={<Regulatory />} />
        <Route path="/services/claims" element={<Claims />} />
        <Route path="/services/ai-solutions" element={<ServiceAI />} />
      </Routes>
      <Footer />
      <ContactModal />
    </>
  )
}

export default App
