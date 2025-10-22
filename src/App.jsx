import { useState } from 'react'
import './App.css'
import Button from './components/Button'
import aboutusImg from './assets/aboutus.jpg'
import contactImg from './assets/contact.jpg'
import servicesImg from './assets/services.jpg'
import projectsImg from './assets/projects.jpg'

function App() {
  const [count, setCount] = useState(0)
  const [view, setView] = useState(1)
  
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
                MHM Builders, Inc. has been serving Arizona with quality construction services for years. 
                Our team of experienced professionals is committed to excellence in every project, 
                from residential homes to commercial developments. We pride ourselves on delivering 
                superior craftsmanship and unmatched customer service.
              </p>
            </div>
          </section>

          <section className="page-section" style={{ backgroundImage: `url(${servicesImg})` }}>
            <div className="page-section-content">
              <h2>Services &amp; Rates</h2>
              <p>
                We offer comprehensive construction services including new builds, tenant improvements, 
                repairs, maintenance, and property rehabilitation. Our competitive rates and transparent 
                pricing ensure you get the best value for your investment. Contact us today for a free consultation.
              </p>
            </div>
          </section>

          <section className="page-section" style={{ backgroundImage: `url(${projectsImg})` }}>
            <div className="page-section-content">
              <h2>Current Projects &amp; Plans</h2>
              <p>
                Explore our portfolio of ongoing and completed projects. From abandoned property 
                rehabilitation to modern commercial developments, we bring vision to reality. 
                Our track record speaks for itself with countless satisfied clients across Arizona.
              </p>
            </div>
          </section>

          <section className="page-section" style={{ backgroundImage: `url(${contactImg})` }}>
            <div className="page-section-content">
              <h2>Contact Us</h2>
              <p>
                Ready to start your next project? Get in touch with our team today. 
                We're here to answer your questions and provide expert guidance every step of the way.
                Let's build something amazing together.
              </p>
            </div>
          </section>
        </div>
      )}
      
      {view === 2 && (
        <div className="view view-2">
          {/* Top navigation banner - fixed */}
          <nav className="nav-banner">
            <a href="#about" className="nav-link">About Us</a>
            <a href="#services" className="nav-link">Services &amp; Rates</a>
            <a href="#projects" className="nav-link">Current Projects &amp; Plans</a>
            <a href="#contact" className="nav-link">Contact Us</a>
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
        <div className="view view-3">
          {/* Top banner */}
          <nav className="nav-banner">
            <div className="company-info-top-left">
              <h1 className="company-name">MHM Builders, Inc.</h1>
              <h2 className="company-title">General Contractors</h2>
              <p className="company-license">ROC NO. 251714 &amp; 267667</p>
            </div>
          </nav>

          {/* Background image with slogan */}
          <div className="background-image" style={{ backgroundImage: `url(${projectsImg})` }}>
            <div className="slogan-center">Repairing Arizona - One Property at a Time!</div>
          </div>

          {/* Contact form in the bottom left */}
          <div className="contact-form-bottom-left">
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
              <button type="submit" className="form-submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default App