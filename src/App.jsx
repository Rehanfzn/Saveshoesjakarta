import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/AdminLogin'
import ErrorBoundary from './admin/ErrorBoundary'
import AdminDashboard from './admin/AdminDashboard'
import AddRecord from './admin/AddRecord'
import AllRecords from './admin/AllRecords'
import Reports from './admin/Reports'

function ProtectedRoute({ children }) {
  const loggedIn = sessionStorage.getItem('admin_logged_in') === 'true'
  if (!loggedIn) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

function CustomerSite() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerSite />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <ErrorBoundary>
                <AdminLayout />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="tambah" element={<AddRecord />} />
          <Route path="data" element={<AllRecords />} />
          <Route path="laporan" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
