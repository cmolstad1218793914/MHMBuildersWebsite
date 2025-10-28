import { Link } from 'react-router-dom'
import PROJECTS from '../data/projects'
import '../App.css'

function Projects() {
  return (
    <section className="projects-page">
      <div className="site-container">
        <header className="projects-head">
          <h1 className="projects-title">Projects</h1>
          <p className="projects-subtitle">A selection of our completed commercial projects.</p>
        </header>

        <ul className="projects-list" aria-label="Projects list">
          {PROJECTS.map((p) => (
            <li key={p.id} className="project-row">
              <figure className="project-media">
                <img src={p.image} alt={p.title} loading="lazy" />
              </figure>
              <div className="project-body">
                <div className="project-meta">
                  <h2 className="project-title">{p.title}</h2>
                  <time className="project-date" dateTime={p.date}>{new Date(p.date).toLocaleDateString()}</time>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-actions">
                  {p.url ? (
                    <a className="project-link" href={p.url} target="_blank" rel="noopener noreferrer">View details</a>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="projects-footer">
          <Link to="/" className="projects-back">← Back to Home</Link>
        </div>
      </div>
    </section>
  )
}

export default Projects
