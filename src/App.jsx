import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import About from './components/About'
import Benefits from './components/Benefits'
import Solutions from './components/Solutions'
import Warranty from './components/Warranty'
import QualityCheck from './components/QualityCheck'
import Comparison from './components/Comparison'
import Configurations from './components/Configurations'
import Industries from './components/Industries'
import Process from './components/Process'
import Reviews from './components/Reviews'
import Faq from './components/Faq'
import QuoteForm from './components/QuoteForm'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        {/* <Benefits /> */}
        <Solutions />
        <Warranty />
        <QualityCheck />
        <Comparison />
        <Configurations />
        <Industries />
        <Process />
        {/* <Reviews /> */}
        <Faq />
        <QuoteForm />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}
