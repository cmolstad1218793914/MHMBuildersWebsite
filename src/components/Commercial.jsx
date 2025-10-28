import servicesImg from '../assets/services.jpg'
import SunriseBank from '../assets/SunriseBank.jpg'
import Airpark from '../assets/Airpark.jpg'
import CommerceCenter from '../assets/PecosSossaman.png'

const SERVICE_GROUPS = [
  {
    title: 'Mechanical, Electrical & Plumbing (MEP)',
    items: [
      'HVAC — Monitor, Install and Repairs',
      'PLUMBING — Sink, Urinal, H2O Heaters, Irrigation',
      'ELECTRICAL — Lighting, Phones, Elevator',
    ],
  },
  {
    title: 'Interiors & Finishes',
    items: [
      'DRYWALL — Large or Small',
      'FRAMING — Walls',
      'ACOUSTICAL — Grid repair and new install',
      'CEILING — Popcorn Removal, New Texture',
      'PAINT — Interior and Exterior',
      'FLOORING — Removal, Disposal, Install, Carpet, Tile, Wood',
      'DOORS & TRIM — Removal and Install',
      'WALL — Art, Shelving, Cabinets, Sconces, Wallpaper Install',
      'SHELVING — Repairs and Install',
    ],
  },
  {
    title: 'Exterior & Site',
    items: [
      'LANDSCAPE MAINTENANCE — Irrigation, Clean-Up, Up-Keep',
      'CONCRETE — Repair and New Pours',
      'MASONRY — Small or Large Projects',
      'METALS — Small or Large Projects',
      'ROOFING — Small Repairs or Complete New Roof Install',
      'GLASS — Store Front, Windows',
      'GUTTER — Clean, Repair and Damage',
      'SIGN — Repairs and Install',
      'STUCCO — Small Repairs to Large Projects',
      'EXCAVATION — Drainage',
    ],
  },
  {
    title: 'Property Services & Preservation',
    items: [
      'DEBRIS REMOVAL — Trash Out',
      'RENTAL TURNS — Clean Up',
      'WINTERIZING — Board Up, Security',
      'ABANDONED — Clean Ups and Security',
      'PROPERTY PRESERVATION — Complete Renovation, Overhaul',
      'REHAB — Tenant Improvements',
      'MAID SERVICE — Trash Out or Maintain',
      'RELOCATION — Office/Commercial Relocation Furniture Move',
      'LIFE SAFETY — Fire Extinguisher',
    ],
  },
]

function Commercial() {
  return (
    <section id="commercial" className="anchor-section commercial-section">
      <div className="commercial-container site-container">
        <header className="commercial-head">
          <h2 className="commercial-title">Commercial Construction</h2>
          <p className="commercial-subtitle">
            Full-service general contracting for tenant improvements, maintenance, and repairs.
          </p>
        </header>

        <div className="commercial-grid">
          <div className="commercial-content">

            <div className="services-groups">
              {SERVICE_GROUPS.map((group, idx) => {
                const imgs = [SunriseBank, Airpark, CommerceCenter, servicesImg]
                const img = imgs[idx % imgs.length]
                return (
                  <section key={group.title} className="service-group">
                    <figure className="service-group__media">
                      <img src={img} alt={group.title} loading="lazy" />
                    </figure>
                    <h3 className="service-group__title">{group.title}</h3>
                    <ul className="service-group__list">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Commercial
