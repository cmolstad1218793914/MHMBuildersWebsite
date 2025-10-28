import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import WorkOrderForm from './components/WorkOrderForm'
import AboutUs from './components/AboutUs'
import Commercial from './components/Commercial'
import './App.css'
import mhmLogo from './assets/MHMLOGO_NoBackground.png'
import ProjectsPage from './pages/Projects'
import PROJECTS from './data/projects'

// PROJECTS data imported for collage

function App() {
  const location = useLocation()
  const [subNavSticky, setSubNavSticky] = useState(false)
  const [subNavTop, setSubNavTop] = useState(0) // absolute top in px when not sticky
  const subNavRef = useRef(null)
  const navBannerRef = useRef(null)
  const initialTriggerY = useRef(null) // page Y where sub-nav should stick

  // Project pagination state
  const [page, setPage] = useState(0)
  const pageSize = 3
  const pageCount = Math.max(1, Math.ceil(PROJECTS.length / pageSize))
  const start = page * pageSize
  const pageProjects = PROJECTS.slice(start, start + pageSize)
  const flipped = page % 2 === 1

  const nextPage = () => setPage(p => (p + 1) % pageCount)
  const prevPage = () => setPage(p => (p - 1 + pageCount) % pageCount)
  
  useEffect(() => {
    const stickyTop = 22; 
    const gapBelowNav = -20;

    const computePositions = () => {
      const navEl = navBannerRef.current
      if (!navEl) return
      const navRect = navEl.getBoundingClientRect()
      const navBottomY = navRect.bottom + window.scrollY
      const absoluteTop = Math.max(0, Math.round(navBottomY + gapBelowNav))
      setSubNavTop(absoluteTop)
      initialTriggerY.current = absoluteTop
    }

    const onScroll = () => {
      if (initialTriggerY.current == null) computePositions()
      const triggerY = (initialTriggerY.current ?? 0) - stickyTop
      setSubNavSticky(window.scrollY >= triggerY)
    }

    const onResize = () => {
      computePositions()
      onScroll()
    }

    computePositions()
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (pageCount <= 1) return
    const id = setInterval(() => {
      setPage(p => (p + 1) % pageCount)
    }, 20000)
    return () => clearInterval(id)
  }, [page, pageCount])

  // Scroll to hash targets after route changes
  useEffect(() => {
    // If we have a hash like #about, try to scroll to it smoothly
    if (location.hash) {
      const id = location.hash.slice(1)
      // use rAF to ensure new route content is committed
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    } else {
      // no hash: scroll to top on any route change
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname, location.hash])
  
  return (
    <>
      <div className="view">
          <nav className="nav-banner" ref={navBannerRef}>
            <div className="nav-left">
              <div className="nav-info">
                <a
                    className="contact-link"
                    href="https://www.google.com/maps/search/?api=1&query=7641+E+Gray+Rd,+Suite+H,+Scottsdale,+AZ+85260"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="contact-icon" aria-hidden="true">
                      <svg className="contact-icon__svg" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6zm0 8.5A2.5 2.5 0 1 1 12 5.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>
                      </svg>
                    </span>
                    <span>
                      7641 E Gray Rd, Suite H<br />
                      Scottsdale, AZ 85260
                    </span>
                </a>
              </div>
            </div>

            <div className="nav-center">
              <img src={mhmLogo} alt="MHM Builders logo" className="nav-logo" />
            </div>

            <div className="nav-right">
              <div className="contact-links">
                  <a className="contact-link" href="mailto:murphyjamesd@mhmincaz.com">
                    <span className="contact-icon" aria-hidden="true">
                      <svg className="contact-icon__svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M22 8l-10 6L2 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>murphyjamesd@mhmincaz.com</span>
                  </a>
                  <a className="contact-link" href="tel:+14806505746">
                    <span className="contact-icon" aria-hidden="true">
                      <svg className="contact-icon__svg" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.66 12.66 0 0 0 .7 2.72 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45 12.66 12.66 0 0 0 2.72.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span>(480) - 650 - 5746</span>
                  </a>
              </div>
            </div>
          </nav>

          <nav
            ref={subNavRef}
            className={`sub-nav ${subNavSticky ? 'sticky' : ''}`}
            style={subNavSticky ? undefined : { top: subNavTop }}
          >
            <Link to="/" className="sub-nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
            <Link to="/#about" className="sub-nav-link">About Us</Link>
            <Link to="/#commercial" className="sub-nav-link">Commercial</Link>
            <Link to="/projects" className="sub-nav-link">Projects</Link>
          </nav>

          <div
            className={`cta-float ${subNavSticky ? 'sticky' : ''}`}
            style={subNavSticky ? undefined : { top: subNavTop }}
          >
            <Link to="/#workorder" className="sub-nav-cta" role="button">Initiate a work order</Link>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <div className="blank-section anchor-section" id="projects">
                  <div className="collage-wrapper">
                    <button
                      className="collage-arrow collage-arrow--left"
                      onClick={prevPage}
                      aria-label="Previous projects"
                      type="button"
                      disabled={pageCount <= 1}
                    >
                      {/* tiny chevron */}
                      <svg
                        className="collage-arrow__svg collage-arrow__svg--left"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <section
                      key={page}
                      className={`collage-grid ${flipped ? 'flip' : ''}`}
                      aria-label="Featured projects"
                    >
                      {pageProjects[0] && (
                        <a
                          href={pageProjects[0].url || `#${pageProjects[0].id}`}
                          target={pageProjects[0].url ? '_blank' : undefined}
                          rel={pageProjects[0].url ? 'noopener noreferrer' : undefined}
                          className="tile tile--left"
                          style={{ '--bg': `url(${pageProjects[0].image})` }}
                          aria-label={pageProjects[0].title}
                        >
                          <span className="tile-label">{pageProjects[0].title}</span>
                        </a>
                      )}

                      {pageProjects[1] && (
                        <a
                          href={pageProjects[1].url || `#${pageProjects[1].id}`}
                          target={pageProjects[1].url ? '_blank' : undefined}
                          rel={pageProjects[1].url ? 'noopener noreferrer' : undefined}
                          className="tile tile--top"
                          style={{ '--bg': `url(${pageProjects[1].image})` }}
                          aria-label={pageProjects[1].title}
                        >
                          <span className="tile-label">{pageProjects[1].title}</span>
                        </a>
                      )}

                      {pageProjects[2] && (
                        <a
                          href={pageProjects[2].url || `#${pageProjects[2].id}`}
                          target={pageProjects[2].url ? '_blank' : undefined}
                          rel={pageProjects[2].url ? 'noopener noreferrer' : undefined}
                          className="tile tile--bottom"
                          style={{ '--bg': `url(${pageProjects[2].image})` }}
                          aria-label={pageProjects[2].title}
                        >
                          <span className="tile-label">{pageProjects[2].title}</span>
                        </a>
                      )}
                    </section>

                    <button
                      className="collage-arrow collage-arrow--right"
                      onClick={nextPage}
                      aria-label="Next projects"
                      type="button"
                      disabled={pageCount <= 1}
                    >
                      <svg
                        className="collage-arrow__svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {pageCount > 1 && (
                      <div className="collage-controls" role="tablist" aria-label="Project pages">
                        {Array.from({ length: pageCount }).map((_, i) => (
                          <button
                            key={i}
                            type="button"
                            className={`collage-dot ${i === page ? 'is-active' : ''}`}
                            aria-label={`Go to page ${i + 1}`}
                            aria-pressed={i === page}
                            onClick={() => setPage(i)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <AboutUs />
                  <Commercial />
                  <div className="blank-section anchor-section" id="workorder">
                    <WorkOrderForm />
                  </div>
                </div>
              }
            />

            <Route path="/projects" element={<ProjectsPage />} />
          </Routes>
      </div>
    </>
  )
}

export default App