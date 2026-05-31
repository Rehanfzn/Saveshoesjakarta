import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyChooseUs from './components/WhyChooseUs'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import BeforeAfter from './components/BeforeAfter'
import Faq from './components/Faq'
import HowItWorks from './components/HowItWorks'
import Footer from './components/Footer'
import WhatsAppBubble from './components/WhatsAppBubble'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <WhatsAppBubble />
      <main>
        <Hero />
        <WhyChooseUs />
        <Services />
        <Gallery />
        <BeforeAfter />
        <Faq />
        <Testimonials />
        <HowItWorks />
      </main>
      <Footer />
    </>
  )
}

export default App
