import servicesImg from '../assets/services.jpg'

function AboutUs() {
  return (
    <section id="about" className="about-section anchor-section">
      <div className="about-container site-container">
        <div className="about-content">
          <h2 className="about-title">About Us</h2>
          <p>
            MHM, Inc. is based on the belief that our customers' needs are of the utmost importance. Our entire team is committed to meeting those needs. As a result, a high percentage of our business is from repeat customers and referrals.
          </p>
          <p>
            Our company has been in the construction business since 1998. We specialize in Commercial & Residential Construction, Property Repairs and Maintenance.
          </p>
          <p>
            From the start, MHM, Inc., has dedicated itself to providing properties, just like yours, the quality service they need in order to keep their properties in rent-able condition.
          </p>
          <p>
            Since the beginning, MHM, Inc., has worked extensively to offer only the best service available. Each employee with MHM, Inc. has the experience and qualifications to master each project with full understanding of what is needed to accomplish an on time completion. Each team member shares the standards for quality workmanship and excellent customer service.
          </p>
          <p>
            We thank you for taking the time to review our company information. We encourage you to contact our references. In doing so, we are confident that you will find that each of them will provide you with the information you require.
          </p>
          <p>
            MHM, Inc. has established a reputation as the business that services each project with skilled crews, customer service excellence, fair pricing and accurate estimates.
          </p>
          <p className="about-outro">
            We welcome the opportunity to earn your trust and deliver you the best service in the industry.
          </p>
        </div>

        <figure className="about-image">
          <img src={servicesImg} alt="MHM Builders team on site" />
        </figure>
      </div>
    </section>
  )
}

export default AboutUs
