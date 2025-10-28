import { useState, useEffect, useRef } from 'react'
import WorkOrderForm from './components/WorkOrderForm'
import './App.css'
import servicesImg from './assets/services.jpg'
import mhmLogo from './assets/MHMLOGO_NoBackground.png'
import milan from './assets/milan.jpg'
import tax from './assets/tax.jpg'
import bar from './assets/bar.jpg'

const PROJECTS = [
  { id: 'azoolsbargrill', title: 'AZOOLS BAR & GRILL', href: '#azoolsbargrill', image: bar, url: 'https://www.thebluebook.com/iProView/805375/mhm-builders-inc/general-contractors/construction-projects/azools-bar-grill-40830/' },
  { id: 'PTFtaxgroup', title: 'PTF - PARADIGM TAX GROUP', href: '#ptftaxgroup', image: tax, url: 'https://www.thebluebook.com/iProView/805375/mhm-builders-inc/general-contractors/construction-projects/ptf-paradigm-tax-group-40829/' },
  { id: 'milanhair', title: 'MILAN LASER HAIR REMOVAL', href: '#milanhair', image: milan, url: 'https://www.thebluebook.com/iProView/805375/mhm-builders-inc/general-contractors/construction-projects/milan-laser-hair-removal-chandler-gateway-414328/' },
  { id: 'sunrise', title: 'SUNRISE BANK', href: '#sunrise', image: servicesImg, url: 'https://www.thebluebook.com/iProView/805375/mhm-builders-inc/general-contractors/construction-projects/sunrise-bank-40827/' },
  { id: 'airpark', title: 'AIRPARK BUSINESS CENTER', href: '#airpark', image: servicesImg, url: 'https://www.thebluebook.com/iProView/805375/mhm-builders-inc/general-contractors/construction-projects/airpark-business-center-40826/' },
  { id: 'commercecenter', title: 'PECOS SOSSAMAN COMMERCE CENTER', href: '#commercecenter', image: servicesImg, url: 'https://www.thebluebook.com/iProView/805375/mhm-builders-inc/general-contractors/construction-projects/pecos-sossaman-commerce-center-40825/' },
]

function App() {
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
  
  return (
    <>
      <div className="view">
          <nav className="nav-banner" ref={navBannerRef}>
            <div className="nav-left">
              <a href="#home" className="nav-home">Left</a>
            </div>

            <div className="nav-center">
              <img src={mhmLogo} alt="MHM Builders logo" className="nav-logo" />
            </div>

            <div className="nav-right">
              <div className="contact-links">
                  <a className="contact-link" href="mailto:murphyjamesd@mhmincaz.com">
                    <svg className="contact-link__icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M22 8l-10 6L2 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>murphyjamesd@mhmincaz.com</span>
                  </a>
                  <a className="contact-link" href="tel:+14806505746">
                    <svg className="contact-link__icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.66 12.66 0 0 0 .7 2.72 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45 12.66 12.66 0 0 0 2.72.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>(480) 650 5746</span>
                  </a>
              </div>
            </div>
          </nav>

          <nav
            ref={subNavRef}
            className={`sub-nav ${subNavSticky ? 'sticky' : ''}`}
            style={subNavSticky ? undefined : { top: subNavTop }}
          >
            <a
              href="#home"
              className="sub-nav-link"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                try { window.history.replaceState(null, '', '#home'); } catch {}
              }}
            >
              Home
            </a>
            <a href="#about" className="sub-nav-link">About Us</a>
            <a href="#commercial" className="sub-nav-link">Commercial</a>
            <a href="#projects" className="sub-nav-link">Projects</a>
          </nav>

          <div
            className={`cta-float ${subNavSticky ? 'sticky' : ''}`}
            style={subNavSticky ? undefined : { top: subNavTop }}
          >
            <a href="#workorder" className="sub-nav-cta" role="button">Initiate a work order</a>
          </div>

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
                    href={pageProjects[0].url || pageProjects[0].href}
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
                    href={pageProjects[1].url || pageProjects[1].href}
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
                    href={pageProjects[2].url || pageProjects[2].href}
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
            </div>

            <div className="blank-section anchor-section" id="about"></div>
            <div className="blank-section anchor-section" id="commercial"></div>
            <div className="blank-section anchor-section" id="workorder">
              <WorkOrderForm />
            </div>
          </div>
      </div>
    </>
  )
}

export default App