import { useState, useEffect, useRef } from 'react'
import './App.css'
import Button from './components/Button'
import aboutusImg from './assets/aboutus.jpg'
import contactImg from './assets/contact.jpg'
import servicesImg from './assets/services.jpg'
import projectsImg from './assets/projects.jpg'
import mhmLogo from './assets/mhmlogoexample.png'

function App() {
  const [count, setCount] = useState(0)
  const [view, setView] = useState(1)
  const [scrolled, setScrolled] = useState(false)
  const view3Ref = useRef(null)
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      <div className="top-left">
        <Button active={view === 1} onClick={() => setView(1)}>1</Button>
        <Button active={view === 2} onClick={() => setView(2)}>2</Button>
        <Button active={view === 3} onClick={() => setView(3)}>3</Button>
      </div>
      
      
      {view === 1 && (
        <div className="view">
          {/* Hero section with accordion */}
          <div className="brand" aria-label="MHM Builders information">
            <div className="brand-name">MHM Builders, Inc.</div>
            <div className="brand-sub">General Contractors</div>
            <div className="brand-lic">ROC NO. 251714 &amp; 267667</div>
          </div>
          <div className="hero-wrapper">
            <div className="sections" role="list" aria-label="Website section previews">
              <div
                className="section"
                role="listitem"
                aria-label="About Us"
                style={{ backgroundImage: `url(${aboutusImg})` }}
              >
                <div className="section-content">
                  <h2>About Us</h2>
                </div>
              </div>

              <div
                className="section"
                role="listitem"
                aria-label="Services & Rates"
                style={{ backgroundImage: `url(${servicesImg})` }}
              >
                <div className="section-content">
                  <h2>Services &amp; Rates</h2>
                </div>
              </div>

              <div
                className="section"
                role="listitem"
                aria-label="Current Project & Plans"
                style={{ backgroundImage: `url(${projectsImg})` }}
              >
                <div className="section-content">
                  <h2>Current Project &amp; Plans</h2>
                </div>
              </div>

              <div
                className="section"
                role="listitem"
                aria-label="Contact Us"
                style={{ backgroundImage: `url(${contactImg})` }}
              >
                <div className="section-content">
                  <h2>Contact Us</h2>
                </div>
              </div>
            </div>

            <div className="footer-box">
              <div className="slogan">Repairing Arizona - One Property at a Time!</div>
              <div className="services-list">
                Residential &amp; Commercial • New Builds &amp; Tenant Improvements • Repairs &amp; Maintenance • Rehab - Preservation - Abandoned Properties
              </div>
            </div>
          </div>

          {/* Full-page scrollable sections */}
          <section className="page-section" style={{ backgroundImage: `url(${aboutusImg})` }}>
            <div className="page-section-content">
              <h2>About Us</h2>
              <p>
                Placeholder
              </p>
            </div>
          </section>

          <section className="page-section" style={{ backgroundImage: `url(${servicesImg})` }}>
            <div className="page-section-content">
              <h2>Services &amp; Rates</h2>
              <p>
                Placeholder
              </p>
            </div>
          </section>

          <section className="page-section" style={{ backgroundImage: `url(${projectsImg})` }}>
            <div className="page-section-content">
              <h2>Current Projects &amp; Plans</h2>
              <p>
                Placeholder
              </p>
            </div>
          </section>

          <section className="page-section" style={{ backgroundImage: `url(${contactImg})` }}>
            <div className="page-section-content">
              <h2>Contact Us</h2>
              <p>
                Placeholder
              </p>
            </div>
          </section>
        </div>
      )}
      
      {view === 2 && (
        <div className="view view-2">
          {/* Top navigation banner - fixed */}
          <nav className="nav-banner">
            <div className="nav-left">
              <a href="#home" className="nav-home">Home</a>
            </div>

            <div className="nav-center">
              <img src={mhmLogo} alt="MHM Builders logo" className="nav-logo" />
            </div>

            <div className="nav-right">
              <a href="#about" className="nav-link">About Us</a>
              <a href="#services" className="nav-link">Services &amp; Rates</a>
              <a href="#projects" className="nav-link">Current Projects &amp; Plans</a>
              <a href="#contact" className="nav-link">Contact Us</a>
            </div>
          </nav>

          {/* Hero image with centered company info */}
          <div className="hero-image" style={{ backgroundImage: `url(${servicesImg})` }}>
            <div className="company-info">
              <h1 className="company-name">MHM Builders, Inc.</h1>
              <h2 className="company-title">General Contractors</h2>
              <p className="company-license">ROC NO. 251714 &amp; 267667</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <div className="contact-form-header">Contact Us</div>
            <form className="contact-form">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="form-input"
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="form-input"
                required
              />
              <textarea 
                placeholder="Your Inquiry" 
                className="form-textarea"
                rows="4"
                required
              ></textarea>
              <button type="submit" className="form-submit">Submit</button>
            </form>
          </div>

          <div className="blank-section"></div>

        </div>
      )}
      {view === 3 && (
        <div
          className="view view-3"
          style={{ height: '100vh', overflowY: 'auto' }}
          ref={view3Ref}
          onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 50)}
        >
          <nav className={`nav-banner ${scrolled ? 'scrolled' : ''}`}>
            <div className="company-info-top-left">
              <h1 className="company-name">MHM Builders, Inc.</h1>
              <h2 className="company-title">General Contractors</h2>
              <p className="company-license">ROC NO. 251714 &amp; 267667</p>
            </div>
            <div className="nav-center">
              <a href="#about" className="nav-link">About Us</a>
              <a href="#services" className="nav-link">Services &amp; Rates</a>
              <a href="#projects" className="nav-link">Current Projects &amp; Plans</a>
              <a href="#contact" className="nav-link">Contact Us</a>
            </div>
          </nav>
          <div className="background-image" style={{ backgroundImage: `url(${aboutusImg})`, maxHeight: '70vh' }}>
            <div className="slogan-center">Repairing Arizona - One Property at a Time!</div>
          </div>
          <section style={{ backgroundColor: '#ffffff', minHeight: '100vh' }} />
          <section style={{ backgroundColor: '#e0e0e0', minHeight: '100vh' }} />
          <section style={{ backgroundColor: '#2e2e2e', minHeight: '100vh' }} />
          <div className="contact-form-bottom-left">
            {/* ...existing code... */}
            <form className="contact-form">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="form-input"
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="form-input"
                required
              />
              <textarea 
                placeholder="Your Inquiry" 
                className="form-textarea"
                rows="2"
                required
              ></textarea>
              <button type="submit" className="form-submit">Get a quote!</button>
            </form>
            {/* ...existing code... */}
          </div>
        </div>
      )}
    </>
  )
}

export default App